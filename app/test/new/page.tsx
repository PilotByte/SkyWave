'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useSearchParams } from 'next/navigation';
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

const FormSchema = z.object({
  examMode: z.boolean(),
  subject: z.enum(['azf', 'bzf', 'bzfe']),
});

function NewTest() {
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
  }
  return (
    <div className="mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1 mx-5"
        >
          <FormField
            control={form.control}
            name="examMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Label</FormLabel>
                  <FormDescription>Description</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewTest;
