'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { useRouter } from 'next/navigation';

export const RepeatButton = ({
  test,
  wrongQuestions,
}: {
  wrongQuestions: Tables<'questions'>[];
  test: Tables<'tests'>;
}) => {
  const client = createClient();
  const router = useRouter();
  return (
    <Button
      className="w-full mt-3"
      onClick={async () => {
        const { data: user } = await client.auth.getUser();

        const userId = user.user?.id;
        if (!userId) {
          return;
        }

        const { data: newTest, error } = await client
          .from('tests')
          .insert({
            user: userId,
            finishedAt: null,
            examMode: test.examMode,
            excludeFromStatistics: false,
            subject: test.subject,
          })
          .select('*')
          .single();

        if (error || !newTest) {
          console.error(error);
          return;
        }

        await client.from('answers').insert(
          wrongQuestions.map((question) => ({
            user: userId,
            question: question.id,
            test: newTest.id,
          }))
        );

        router.push(`/test/${newTest.id}`);
      }}
    >
      Repeat wrong questions
    </Button>
  );
};
