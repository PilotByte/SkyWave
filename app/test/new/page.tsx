"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardSelector from "../_components/CardSelector";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  examMode: z.boolean(),
  subject: z.enum(["azf", "bzf", "bzfe"]),
  amount: z.number().min(1),
});

const subjects = [
  {
    subject: "azf",
    title: "AZF",
    description: "Start a test with the current AZF catalog",
  },
  {
    subject: "bzf",
    title: "BZF",
    description: "Start a test with the current BZF catalog",
  },
  {
    subject: "bzfe",
    title: "BZF-E",
    description: "Start a test with the current BZF-E catalog",
  },
];

function NewTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      examMode: false,
      subject: (searchParams.get("pool") ||
        "azf") as (typeof FormSchema)["_output"]["subject"],
      amount: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // Redirecting to ID = 1 for testing
    router.push(`/test/${1}`);
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
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormItem className="flex-grow">
                  <div>
                    <FormLabel className="font-bold">Exam Mode</FormLabel>
                    <FormDescription>
                      Enable exam mode for a more realistic test experience.
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
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <div>
                {/* Enter code for amount selector */}
              </div>
            )}
          />
          <Button type="submit">Start Test</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewTest;
