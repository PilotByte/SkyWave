'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';

interface CompleteTestProps {
  answers: Tables<'answers'>[];
  test: Tables<'tests'>;
}

export const CompleteTest = ({ answers, test }: CompleteTestProps) => {
  const [showWarnModal, setShowWarnModal] = useState(false);
  const client = createClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isCompleted = answers.every((a) => a.selectedAnswer !== null);

  return (
    <div>
      <Button
        variant={isCompleted ? 'default' : 'outline'}
        onClick={() => {
          if (!isCompleted) {
            setShowWarnModal(true);
            return;
          } else {
            setLoading(true);
            client
              .from('tests')
              .update({ finishedAt: new Date().toISOString() })
              .eq('id', test.id)
              .then(() => {
                setLoading(false);
                router.push(`/test/result?test=${test.id}`);
              });
          }
        }}
      >
        Complete
      </Button>
      <AlertDialog
        open={showWarnModal}
        onOpenChange={(v) => setShowWarnModal(v)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You have not answered all questions. Are you sure you want to
              complete the test?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setLoading(true);
                client
                  .from('tests')
                  .update({ finishedAt: new Date().toISOString() })
                  .eq('id', test.id)
                  .then(() => {
                    setLoading(false);
                    router.push(`/test/result?test=${test.id}`);
                  });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
