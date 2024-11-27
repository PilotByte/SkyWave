import { createClient } from '@/lib/supabase/server';
import { ActiveQuestionCard } from '../_components/ActiveQuestionCard';
import { Tables } from '@/lib/supabase/database.types';
import { redirect } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuestionList } from '../_components/QuestionList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CompleteTest } from '../_components/completeTest';

async function TestInProgress({
  params: { id: testId },
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}) {
  const client = await createClient();

  const { data: answers, error: answersError } = await client
    .from('answers')
    .select('*, question:questions(*)')
    .eq('test', testId)
    .order('id', { ascending: true });

  const { data: test, error: testError } = await client
    .from('tests')
    .select('*')
    .eq('id', testId)
    .single();

  if (answersError || testError) {
    console.error(answersError, testError);
    return <div>Error</div>;
  }

  const nQuestion = parseInt(searchParams.n || '0');

  const activeAnswer = answers[nQuestion];

  if (!activeAnswer) {
    return redirect(`/test/${testId}?n=0`);
  }

  console.log(activeAnswer);

  const question = activeAnswer.question as unknown as Tables<'questions'>;

  return (
    <div className="w-full flex-1 items-start md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[295px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed z-30 hidden h-[calc(100vh-200px)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <QuestionList test={test} answers={answers} />
        </ScrollArea>
      </aside>
      <div className="my-4 space-y-2">
        <div className="w-full flex justify-between">
          <Link href={`/test/${testId}?n=${nQuestion - 1}`}>
            {nQuestion > 0 && <Button variant={'link'}>Previous</Button>}
          </Link>
          <h1 className="text-2xl font-bold">
            {nQuestion} / {answers.length}
          </h1>
          <Link href={`/test/${testId}?n=${nQuestion + 1}`}>
            {nQuestion < answers.length - 1 && (
              <Button variant={'link'}>Next</Button>
            )}
          </Link>
        </div>
        <ActiveQuestionCard
          question={question.title}
          answers={(
            question.answers as ({ text: string; correct: boolean } | null)[]
          ).filter(
            (
              answer: { text: string; correct: boolean } | null
            ): answer is { text: string; correct: boolean } => answer !== null
          )}
          initialSelectedAnswer={activeAnswer.selectedAnswer}
          answerId={activeAnswer.id}
          testId={testId}
          nQuestion={nQuestion}
        />
        <CompleteTest answers={answers || []} test={test} />
      </div>
    </div>
  );
}

export default TestInProgress;
