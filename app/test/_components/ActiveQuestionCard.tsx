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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <Button
              key={index}
              variant={selectedAnswer === answer ? 'default' : 'outline'}
              className="w-full justify-start text-left font-normal"
              onClick={() => setSelectedAnswer(answer)}
            >
              <span className="mr-4 font-semibold">{letters[index]}</span>
              <span className="break-all max-w-{3px}">{answer}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
