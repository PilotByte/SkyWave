'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const sendResetEmail = async (formData: FormData) => {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    return redirect(`/request-reset?error=${error.message}`);
  }
  redirect(`/login?info=Password reset link sent to ${email}, it it exists`);
};
