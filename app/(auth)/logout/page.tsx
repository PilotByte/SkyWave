'use client';
import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default function Page() {
  const client = createClient();
  client.auth.signOut();

  redirect('/login');
}
