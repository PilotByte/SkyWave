'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tables } from '@/lib/supabase/database.types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';

export const QuestionList = ({
  test,
  answers,
}: {
  test: Tables<'tests'>;
  answers: (Tables<'answers'> & {
    question: Tables<'questions'>;
  })[];
}) => {
  const searchParams = useSearchParams();
  const index = parseInt((searchParams.get('n') as string) || '0');

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-800px)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="flex flex-wrap">
        {answers.length === 0 && (
          <p className="text-center text-muted-foreground">No questions</p>
        )}

        {answers.map((answer, i) => {
          const question = answer.question;
          return (
            <Link href={`/test/${test.id}?n=${i}`} key={question.id}>
              <Button
                key={question.id}
                variant={
                  i == index
                    ? 'outline'
                    : answer.selectedAnswer
                    ? 'secondary'
                    : 'link'
                }
                className={cn(
                  'flex-grow-1 w-[80px] m-1',
                  test.examMode &&
                    answer.selectedAnswer !== null &&
                    'bg-primary',
                  !test.examMode &&
                    answer &&
                    answer.isCorrect &&
                    'bg-green-700 text-black',
                  !test.examMode &&
                    answer.selectedAnswer &&
                    !answer.isCorrect &&
                    'bg-red-700'
                )}
              >
                {question.pdfId}
              </Button>
            </Link>
          );
        })}
      </ScrollArea>
    </aside>
  );
};
