'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const resetPassword = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('password-confirm') as string;

  if (password !== passwordConfirm) {
    redirect('/reset-password?error=Passwords do not match');
  }

  const reset = await supabase.auth.updateUser({
    password,
  });

  if (reset.error) {
    console.log(reset.error);
    return redirect(`/reset-password?error=${reset.error.message}`);
  }

  redirect('/login?info=Password reset successful, please login');
};
