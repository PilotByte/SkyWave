'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { Checkbox } from '@/components/ui/checkbox';
import CardSelector from '../components/CardSelector';

const FormSchema = z.object({
  examMode: z.boolean(),
  subject: z.enum(['azf', 'bzf', 'bzfe']),
});

function NewTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      examMode: true,
      subject: (searchParams.get('pool') ||
        'azf') as (typeof FormSchema)['_output']['subject'],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // Redirecting to ID = 1 for testing
    router.push(`/test/${1}`);
  }
  return (
    <div className="max-w-[800px] mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1 mx-5"
        >
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <div className="flex justify-center">
                <div className="mx-1">
                  <CardSelector
                    title={'AZF'}
                    description={'Start a test with the current AZF catalog'}
                    onClick={() => field.onChange({ target: { value: 'azf' } })}
                    {...field}
                  />
                </div>
                <div className="mx-1">
                  <CardSelector
                    title={'BZF'}
                    description={'Start a test with the current BZF catalog'}
                    onClick={() => field.onChange({ target: { value: 'bzf' } })}
                    {...field}
                  />
                </div>
                <div className="mx-1">
                  <CardSelector
                    title={'BZF-E'}
                    description={'Start a test with the current BZF-E catalog'}
                    onClick={() =>
                      field.onChange({ target: { value: 'bzf-e' } })
                    }
                    {...field}
                  />
                </div>
              </div>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewTest;
