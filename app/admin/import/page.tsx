'use client';

import { Input } from '@/components/ui/input';
import { parsePDF } from './action';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

function Import() {
  const client = createClient();
  const [questions, setQuestions] = useState<
    {
      lbaIndex: string | null;
      question: string;
      answers: string[];
    }[]
  >([]);
  const [subject, setSubject] = useState<('azf' | 'bzf' | 'bzfe') | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const questionsParsed = questions.map((q) => ({
    title: q.question,
    pdfId: q.lbaIndex!,
    answers: q.answers.map((a, i) => ({
      text: a,
      correct: i == 0,
    })),
    subject: subject!,
  }));

  return (
    <div className="space-y-4">
      <h1>Import</h1>
      <Input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
              let text = e.target?.result as string;

              // remove footer from pdf text
              text = text.replace(/Prüfungsfragen im Prüfungsteil.*/g, '');

              text = text.replace(/Stand:.*Seiten/g, '');

              text = text.replace('\n', '');

              const questions = parsePDF(text);
              setQuestions(questions);
            };
            reader.readAsText(file);
          }
        }}
      />
      <Select
        onValueChange={(v) => {
          setSubject(v as 'azf' | 'bzf' | 'bzfe');
        }}
        value={subject || undefined}
      >
        <SelectTrigger>Choose Subject</SelectTrigger>
        <SelectContent>
          <SelectItem value="bzf">BZF</SelectItem>
          <SelectItem value="bzfe">BZF - E</SelectItem>
          <SelectItem value="azf">AZF</SelectItem>
        </SelectContent>
      </Select>

      {questions.length > 0 && subject && (
        <>
          <p>Found {questions.length} Questions</p>
          <p>Selected Subject: {subject}</p>
          <Button
            onClick={async () => {
              setLoading(true);

              for (const q of questionsParsed) {
                await client.from('questions').insert(q).select('*').single();
                setProgress((prev) => prev + 1);
              }

              setLoading(false);
            }}
          >
            {loading ? `${progress} / ${questions.length}` : 'Import'}
          </Button>
        </>
      )}
    </div>
  );
}

export default Import;
