'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TestQuestionProps {
  question: string;
  answers: string[];
}

export function ActiveQuestionCard({
  question = 'What is the capital of France?',
  answers = ['London', 'Berlin', 'Paris', 'Madrid'],
}: TestQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <Button
              key={index}
              variant={selectedAnswer === answer ? 'default' : 'outline'}
              onClick={() => setSelectedAnswer(answer)}
              className="w-full flex h-auto"
            >
              <span className="font-semibold">{letters[index]}</span>
              <span className="whitespace-break-spaces flex-auto">
                {answer}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
