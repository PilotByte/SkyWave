/* eslint-disable react/display-name */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { shuffle } from '@/lib/random';
import Image from 'next/image';
import { Tables } from '@/lib/supabase/database.types';

interface TestQuestionProps {
  question: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
  initialSelectedAnswer: number | null;
  answerId: number;
  testId: string;
  nQuestion: number;
  imageUrl?: string;
  test: Tables<'tests'>;
}

export function ActiveQuestionCard({
  question,
  answers,
  initialSelectedAnswer,
  answerId,
  testId,
  nQuestion,
  imageUrl,
  test,
}: TestQuestionProps) {
  const client = createClient();
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    initialSelectedAnswer
  );
  const searchParams = useSearchParams();
  const showSolution = searchParams.get('showSolution') === 'true';

  const saveAnswer = useCallback(
    async (index: number) => {
      setSelectedAnswer(index);
      console.log('saving asnwer', answers[index], selectedAnswer);
      const isCorrect = answers[index].correct;
      const { error, data } = await client
        .from('answers')
        .update({ selectedAnswer: index, isCorrect })
        .eq('id', answerId)
        .select('*');

      console.log(error, data);
      if (isCorrect || test.examMode) {
        router.push(`/test/${testId}?n=${nQuestion + 1}`);
        router.refresh();
        setSelectedAnswer(null);
      } else {
        router.push(`/test/${testId}?n=${nQuestion}&showSolution=true`);
        router.refresh();
      }
    },
    [answers, selectedAnswer, answerId, client, router, test, testId, nQuestion]
  );

  useEffect(() => {
    setSelectedAnswer(initialSelectedAnswer);
  }, [initialSelectedAnswer]);

  console.log(selectedAnswer, initialSelectedAnswer);

  const AnswerButtons = useMemo(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const answerButtons = answers.map(
      (answer, index) =>
        ({ originalIndex }: { originalIndex: number }) =>
          (
            <Button
              key={index}
              variant={selectedAnswer === index ? 'default' : 'outline'}
              onClick={() => {
                saveAnswer(index);
              }}
              className={cn(
                'w-full flex h-auto',
                showSolution && answer.correct && 'bg-green-800',
                showSolution &&
                  selectedAnswer === index &&
                  !answer.correct &&
                  'bg-red-800'
              )}
            >
              <span className="font-semibold">{letters[originalIndex]}</span>
              <span className="whitespace-break-spaces flex-auto">
                {answer.text}
              </span>
            </Button>
          )
    );

    return shuffle(answerButtons, nQuestion);
  }, [answers, selectedAnswer, showSolution, saveAnswer, nQuestion]);

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{question}</CardTitle>
        {imageUrl && (
          <Image
            className="mx-auto"
            width={200}
            height={200}
            src={imageUrl}
            alt="image for question. If you see this something went wrong"
          />
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {AnswerButtons.map((E, i) => (
            <E key={i} originalIndex={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
