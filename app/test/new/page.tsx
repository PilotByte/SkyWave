"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  examMode: z.boolean(),
  subject: z.enum(["azf", "bzf", "bzfe"]),
  amount: z.number().min(1),
});

const maxQuestions = 100;

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
      amount: 1, // change to catalog amount
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
                              : Math.min(Math.max(newValue, 1), maxQuestions)
                          );
                        }}
                        min={1}
                        max={maxQuestions}
                      />
                    )}
                  />
                  <span>/ {maxQuestions}</span>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={maxQuestions}
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

export default NewTest;
