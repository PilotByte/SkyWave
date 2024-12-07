import { Button } from '@/components/ui/button';
import { Tables } from '@/lib/supabase/database.types';
import Link from 'next/link';

export const UnfinishedTests = ({
  unfinishedTests,
}: {
  unfinishedTests: (Tables<'tests'> & {
    answers: Tables<'answers'>[];
  })[];
}) => (
  <div className="p-4 border rounded-lg">
    <h2 className="text-2xl font-bold text-center">Unfinished tests</h2>
    <div className="mt-4">
      {unfinishedTests.map((test) => {
        return (
          <div key={test.id} className=" flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{test.subject}</h3>
              <p className="text-sm text-gray-500">
                {new Date(test.created_at).toLocaleString()}
              </p>
            </div>
            <Link href={`/test/${test.id}`}>
              <Button className=" px-4 py-2 rounded-lg">View</Button>
            </Link>
          </div>
        );
      })}
    </div>
  </div>
);
