'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardSelector from '../_components/CardSelector';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';
import { Filters } from './Filters';
import { filter } from './filter';
import { useMemo } from 'react';

export const FormSchema = z.object({
  examMode: z.boolean(),
  subject: z.enum(['azf', 'bzf', 'bzfe']),
  amount: z.number().min(1),
  filter: z.array(z.string()),
});

const subjects = [
  {
    subject: 'azf',
    title: 'AZF',
    description: 'AZF Catalog - Date: 1st May 2024',
  },
  {
    subject: 'bzf',
    title: 'BZF',
    description: 'BZF Catalog - Date: 1st May 2024',
  },
  {
    subject: 'bzfe',
    title: 'BZF-E',
    description: 'BZF-E Catalog - Date: 1st May 2024',
  },
];

function NewTestPage() {
  const client = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<
    Database['public']['Tables']['questions']['Row'][]
  >([]);

  const [answers, setAnswers] = useState<
    Database['public']['Tables']['answers']['Row'][]
  >([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      examMode: false,
      subject: (searchParams.get('pool') ||
        'azf') as (typeof FormSchema)['_output']['subject'],
      amount: 1, // change to catalog amount
      filter: [],
    },
  });
  const subject = form.watch('subject');
  const formFilter = form.watch('filter');
  const amount = form.watch('amount');

  const filteredQuestions = useMemo(
    () =>
      questions.filter((fq) => {
        return filter.some((f) => {
          const filterFunction = f.getFilterFn(
            answers.filter((a) => a.question == fq.id) || []
          );
          if (!formFilter.length) return true;
          if (!formFilter.includes(f.value)) return false;
          return filterFunction(fq);
        });
      }),
    [questions, answers, formFilter]
  );

  useEffect(() => {
    form.setValue('amount', filteredQuestions.length);
  }, [filteredQuestions, form]);

  const reducedQuestions = [...filteredQuestions];
  const countQuestionsToBeRemoved = filteredQuestions.length - amount;

  // number of items to remove
  for (let i = 0; i < countQuestionsToBeRemoved; i++) {
    const randomIndex = Math.floor(Math.random() * reducedQuestions.length);
    reducedQuestions.splice(randomIndex, 1);
  }

  useEffect(() => {
    const getSubjectAnswers = async () => {
      const { data, error } = await client
        .from('answers')
        .select('*, test (subject)')
        .eq('test.subject', subject);
      if (error) {
        console.error(error);
        return;
      }
      setAnswers(data);
    };
    getSubjectAnswers();

    const getSubjectQuestions = async () => {
      const { data, error } = await client
        .from('questions')
        .select('*')
        .eq('subject', subject);
      if (error) {
        console.error(error);
        return;
      }
      setQuestions(data);
    };
    getSubjectQuestions();
  }, [client, subject]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const { data: user } = await client.auth.getUser();

    const userId = user.user?.id;
    if (!userId) {
      return;
    }

    const { data: newTest, error } = await client
      .from('tests')
      .insert({
        user: userId,
        finishedAt: null,
        examMode: formData.examMode,
        excludeFromStatistics: false,
        subject: formData.subject,
      })
      .select('*')
      .single();

    if (error || !newTest) {
      console.error(error);
      return;
    }

    await client.from('answers').insert(
      reducedQuestions
        .map((question) => ({
          user: userId,
          question: question.id,
          test: newTest.id,
        }))
        .sort(() => Math.random() - 0.5)
    );

    router.push(`/test/${newTest.id}`);
  }
  return (
    <div className="max-w-[800px] mx-auto mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1 mx-5 border rounded p-4"
        >
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <div className="flex justify-center gap-5">
                {subjects.map((subject) => (
                  <CardSelector
                    key={subject.subject}
                    title={subject.title}
                    description={subject.description}
                    onClick={() => field.onChange(subject.subject)}
                    isSelected={field.value === subject.subject}
                  />
                ))}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="examMode"
            render={({ field }) => (
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 gap-3 shadow-sm">
                <FormItem className="flex-grow">
                  <div>
                    <FormLabel className="font-bold">Exam Mode</FormLabel>
                    <FormDescription>
                      Enable exam mode to practice the theory under exam
                      conditions for your exam at the Bundesnetzagentur
                    </FormDescription>
                  </div>
                </FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            )}
          />
          <Filters formControl={form.control} />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Controller
                    name="amount"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type="number"
                        className="max-w-16"
                        value={value}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value, 10);
                          onChange(
                            isNaN(newValue)
                              ? 1
                              : Math.min(
                                  Math.max(newValue, 1),
                                  filteredQuestions.length
                                )
                          );
                        }}
                        min={1}
                        max={filteredQuestions.length}
                      />
                    )}
                  />
                  <span>/ {filteredQuestions.length}</span>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={filteredQuestions.length}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>
                  Select the amount of questions you want to answer.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Start Test</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewTestPage;
