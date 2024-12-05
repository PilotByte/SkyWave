import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Tables } from '@/lib/supabase/database.types';
import { RepeatButton } from './RepeatButton';

export const TotalResult = ({
  test,
  answers,
}: {
  test: Tables<'tests'>;
  answers: (Tables<'answers'> & {
    question: Tables<'questions'>;
  })[];
}) => {
  const correctAnswersCount = answers.filter((a) => a.isCorrect).length;
  const wrongQuestions = answers
    ?.filter((q) => q.isCorrect)
    .map((q) => q.question);
  const testPercentage = (correctAnswersCount / (answers?.length || 1)) * 100;
  const testPassed = testPercentage >= 75;
  return (
    <div className="flex flex-col space-y-3 px-1 py-4">
      <h2>Your Result:</h2>
      <h1 className="text-4xl text-center">{Math.round(testPercentage)} %</h1>
      <div>
        <p className="text-muted-foreground text-sm text-right ">
          {correctAnswersCount} / {answers.length}
        </p>
        <Progress value={testPercentage} className="h-2" />
      </div>
      <Separator />
      <div className="flex flex-col">
        <div className="inline-flex justify-between">
          <p className="text-muted-foreground text-sm">Status:</p>
          <p
            className={cn(
              'text-right text-2xl font-bold text-green-900',
              !testPassed && 'text-red-900'
            )}
          >
            {testPassed ? 'Passed' : 'Failed'}
          </p>
        </div>
        <div className="inline-flex justify-between text-sm">
          <p className="text-muted-foreground">Test Duration</p>
          <p className="text-right text-xl font-thin">
            {dayjs(test.finishedAt).diff(test.created_at, 'minute')} minutes
          </p>
        </div>
        <div className="inline-flex justify-between text-sm">
          <p className="text-muted-foreground">Time started</p>
          <p className="text-right text-xl font-thin">
            {dayjs(test.created_at).format('HH:mm')}
          </p>
        </div>
        <div className="inline-flex justify-between text-sm">
          <p className="text-muted-foreground">Time finished</p>
          <p className="text-right text-xl font-thin">
            {dayjs(test.finishedAt).format('HH:mm')}
          </p>
        </div>
        <div className="inline-flex justify-between text-sm">
          <p className="text-muted-foreground">Test Date</p>
          <p className="text-right text-xl font-thin">
            {dayjs(test.created_at).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
      <Separator />
      <div className="">
        <Link href="/test/new">
          <RepeatButton test={test} wrongQuestions={wrongQuestions} />
          <Button className="w-full mt-3" variant={'secondary'}>
            New Test
          </Button>
        </Link>
      </div>
    </div>
  );
};
