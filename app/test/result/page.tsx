import { createClient } from '@/lib/supabase/server';

const ResultTestPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const testId = searchParams && parseInt(searchParams.test);
  const client = await createClient();

  if (!testId) return null;

  const test = client
    .from('tests')
    .select('*')
    .eq('id', testId)
    .then((data) => data.data);

  const answers = await client
    ?.from('answers')
    .select('*, question:questions(*)')
    .eq('test', searchParams?.test)
    .order('id', { ascending: true });

  return (
    <div className="items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-5">
      <div className="w-full space-y-2">
        {/* {test && <TotalResult test={test} />} */}
      </div>
      <div>
        <h1 className="font-bold text-2xl">Results per Sub-Subject:</h1>
      </div>
    </div>
  );
};
export default ResultTestPage;
