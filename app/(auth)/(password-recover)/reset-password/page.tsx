'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { resetPassword } from './actions';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

const RequestReset = () => {
  const supabase = createClient();
  const params = useSearchParams();
  const [sessionRestored, setSessionRestored] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        setSessionRestored(true);
      }
    });
    supabase.auth.exchangeCodeForSession(params.get('code') || '');
  }, [supabase.auth, params]);

  return (
    <div className="flex items-center justify-center mt-[100px] md:mt-[1/2vh]">
      <Card className="w-[850px]">
        <form>
          <CardHeader>
            <CardTitle>Password reset</CardTitle>
            <CardDescription>Please enter your new Password.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Passwort</Label>
                <Input name="password" id="password" placeholder="password" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password-confirm">Repeat Passwort</Label>
                <Input
                  name="password-confirm"
                  id="password-confirm"
                  placeholder="password-confirm"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <p className="text-red-600 font-bold text-lg">
              {params.get('error')}
            </p>
            {sessionRestored && (
              <p className="text-green-600 font-bold text-lg">
                Session restored, please reset your password
              </p>
            )}
            <div className="flex w-full">
              <Button className="font-bold flex-1" formAction={resetPassword}>
                Reset Password
              </Button>
              <Link href={'/login'} className="flex-1 flex">
                <Button variant="ghost" className="flex-1">
                  login
                </Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RequestReset;
