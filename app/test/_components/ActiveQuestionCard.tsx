'use client';

import { useCallback, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { shuffle } from '@/lib/random';

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
}

export function ActiveQuestionCard({
  question,
  answers,
  initialSelectedAnswer,
  answerId,
  testId,
  nQuestion,
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
      console.log(answers[index]);
      const isCorrect = answers[index].correct;
      await client
        .from('answers')
        .update({ selectedAnswer, isCorrect })
        .eq('id', answerId);

      console.log(nQuestion);
      if (isCorrect) {
        router.push(`/test/${testId}?n=${nQuestion + 1}`);
        router.refresh();
      } else {
        router.push(`/test/${testId}?n=${nQuestion}&showSolution=true`);
        router.refresh();
      }
    },
    [answers, selectedAnswer, answerId, client, router, testId, nQuestion]
  );

  const AnswerButtons = useMemo(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const answerButtons = answers.map((answer, index) => (
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
        <span className="font-semibold">{letters[index]}</span>
        <span className="whitespace-break-spaces flex-auto">{answer.text}</span>
      </Button>
    ));

    return shuffle(answerButtons, nQuestion);
  }, [answers, selectedAnswer, nQuestion, showSolution, saveAnswer]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">{AnswerButtons}</div>
      </CardContent>
    </Card>
  );
}
