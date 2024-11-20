import { createClient } from '@/lib/supabase/server';
import { columns } from './components/columns';
import { Table } from './components/QuestionTable';
import { redirect } from 'next/navigation';

export default async function Users() {
  const client = await createClient();
  const { data, error } = await client.from('questions').select('*');
  if (error) {
    redirect(`/error?error=${error.message}`);
  }

  return (
    <div className="mx-4">
      <Table columns={columns} data={data} />
    </div>
  );
}
