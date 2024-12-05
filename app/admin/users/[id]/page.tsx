import { createClient } from '@/lib/supabase/client';
import { ResetPasswordForm } from './_components/ResetPassword';
import { redirect } from 'next/navigation';
import { ChangeDetailsForm } from './_components/ChangeDetails';

async function ManageUserPage({ params }: { params: Record<string, string> }) {
  const supabase = createClient();

  const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!user) redirect('/admin/users');

  return (
    <div className="space-y-8">
      <h1 className="text-xl">Manage User</h1>
      <ChangeDetailsForm id={params.id} />
      <ResetPasswordForm email={user.email!} />
    </div>
  );

}

export default ManageUserPage;
