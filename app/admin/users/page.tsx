import { createClient } from '@/lib/supabase/server';
import { columns } from './components/columns';
import UserTable from './components/UserTable';
import { redirect } from 'next/navigation';

export default async function Users() {
  const client = await createClient();
  const { data, error } = await client.from('profiles').select('*');
  if (error) {
    redirect(`/error?error=${error.message}`);
  }

  return (
    <div>
      <UserTable columns={columns} data={data} />
    </div>
  );
}
