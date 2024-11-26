import { createClient } from "@/lib/supabase/server";
import { ActiveQuestionCard } from "../_components/ActiveQuestionCard";

async function TestInProgress({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}) {
  const client = await createClient();

  const { data: testData, error } = await client
    .from("answers")
    .select("*, question (*)")
    .eq("test", params.id);

  if (error) {
    console.error(error);
    return null;
  }

  const nQuestion = parseInt(searchParams.n || "0");

  const activeQuestion = testData[nQuestion];

  console.log(activeQuestion);

  return (
    <div className="my-4">
      <ActiveQuestionCard
        question={activeQuestion.question.title}
        answers={activeQuestion.question.answers.map((answer) => answer.text)}
      />
    </div>
  );
}

export default TestInProgress;
