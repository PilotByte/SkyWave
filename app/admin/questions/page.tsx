"use client";

import { Separator } from "@/components/ui/separator";
import { QuestionTable } from "./QuestionsTable";

function Questions() {

  return (
    <div className="space-y-3 h-full flex-col flex ">
      <div>
        <h3 className="font-medium text-lg">Sort</h3>
        <p className="text-muted-foreground text-sm">
          Get Questions from the Datapool and sort them to the respective
          Sub-Subjects.
        </p>
      </div>
      <Separator />
      <QuestionTable
        questions={[] as any}
        columns={[]}
        subSubjects={[]}
      />
    </div>
  );
}

export default Questions;