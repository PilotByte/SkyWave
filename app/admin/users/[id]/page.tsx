import { createClient } from '@/lib/supabase/client';
import { ResetPasswordForm } from './ResetPassword';
import { redirect } from 'next/navigation';

async function ManageUserPage({ params }: { params: Record<string, string> }) {
  const supabase = createClient();

  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!user) redirect('/admin/users');

  return (
    <div>
      {' '}
      <h1 className="text-xl">Manage User</h1>
      <ResetPasswordForm email={user.email} />
    </div>
  );
}

export default ManageUserPage;
