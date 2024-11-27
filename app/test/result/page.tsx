import { createClient } from '@/lib/supabase/server';
import { TotalResult } from './TotalResult';
import { Badge } from '@/components/ui/badge';
import { Ban, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const ResultTestPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const testId = searchParams && parseInt(searchParams.test);
  const client = await createClient();

  if (!testId) return null;

  const { data: test } = await client
    .from('tests')
    .select('*')
    .eq('id', testId)
    .single();

  const { data: answers } = await client
    .from('answers')
    .select('*, question:questions(*)')
    .eq('test', searchParams?.test)
    .order('id', { ascending: true });

  console.log(answers, test);
  if (!test || !answers) return null;

  return (
    <div className="items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-5">
      <div className="w-full space-y-2">
        {test && <TotalResult test={test} answers={answers} />}
      </div>
      <div>
        <h1 className="font-bold text-2xl">Results per Sub-Subject:</h1>
        {answers.map((a) => (
          <div
            key={a.id}
            className={cn(
              'p-2 rounded-sm border mt-4',
              a.isCorrect ? 'border-green-700' : 'border-destructive'
            )}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{a.question.title}</h3>
              <p className="text-sm text-muted-foreground">{a.question.id}</p>
            </div>
            <Separator className="my-2" />

            {a.selectedAnswer && (
              <div className="flex gap-3">
                {a.isCorrect ? (
                  <Check className="h-5" />
                ) : (
                  <Ban className="h-5" />
                )}
                <p
                  className={cn(
                    'text-muted-foreground',
                    a.isCorrect && 'text-foreground'
                  )}
                >
                  {
                    (
                      a.question.answers[a?.selectedAnswer] as {
                        text: string;
                      }
                    ).text
                  }
                </p>
              </div>
            )}
            {!a?.isCorrect && (
              <div className="flex gap-3">
                <Check className="h-5" />
                <p>
                  {
                    (
                      a.question.answers.find(
                        (a: unknown) =>
                          (
                            a as {
                              correct: boolean;
                            }
                          )?.correct
                      ) as {
                        isCorrect: boolean;
                        text: string;
                      }
                    )?.text
                  }
                </p>
              </div>
            )}
            <div className="flex justify-end gap-1">
              <Badge>{a?.isCorrect ? 'Correct' : 'incorrect'}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResultTestPage;
