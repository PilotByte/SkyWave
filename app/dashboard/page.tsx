'use client';

import { ClickableCard } from '@/components/ui/clickable-card';
import ProgressChartWithLabel from './_components/ProgressChart';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useMemo } from 'react';
import { Tables } from '@/lib/supabase/database.types';
import { UnfinishedTests } from './_components/UnfinishedTests';

function Dashboard() {
  const router = useRouter();
  const client = createClient();
  const [tests, setTests] = useState<
    (Tables<'tests'> & {
      answers: Tables<'answers'>[];
    })[]
  >([]);

  useEffect(() => {
    async function fetchAnswers() {
      const { data, error } = await client
        .from('answers')
        .select('*, test:tests( * )')
        .gt(
          'test.created_at',
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
        ) // Last 7 days
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) {
        console.error(error);
        return;
      }
      // reduce to tests with answers with types
      const tests = data.reduce<
        (Tables<'tests'> & {
          answers: Tables<'answers'>[];
        })[]
      >((acc, answer) => {
        const test = answer.test as Tables<'tests'>;

        if (!test) return acc;

        const existingTest = acc.find((t) => t.id === test.id);
        if (existingTest) {
          existingTest.answers.push(answer);
        } else {
          acc.push({ ...test, answers: [answer] });
        }
        return acc;
      }, []);
      setTests(tests);
    }

    fetchAnswers();
  }, [client]);

  const unfinishedTests = useMemo(
    () => tests.filter((test) => !test.finishedAt),
    [tests]
  );
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 mt-4">
        {/* Progress chart */}
        <div>
          <ProgressChartWithLabel
            data={tests}
            title="Your Progress"
            description="This graph shows your progress from the last 10 tests"
          />
        </div>
        {unfinishedTests.length > 0 && (
          <UnfinishedTests unfinishedTests={unfinishedTests} />
        )}

        {/* AZF/BZF clickable cards */}
        <div className="flex justify-center space-x-4 mt-4 mb-4">
          <ClickableCard
            title="AZF Practice"
            description="Click here to start practicing your AZF theory"
            onClick={() => router.push('/test/new?pool=azf')}
          />
          <ClickableCard
            title="BZF Practice"
            description="Click here to start practicing your BZF theory"
            onClick={() => router.push('/test/new?pool=bzf')}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
