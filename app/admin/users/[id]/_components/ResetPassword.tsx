'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export const ResetPasswordForm = ({ email }: { email: string }) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/password-reset`,
    });
    setIsLoading(false);
    if (!error) {
      setIsSuccess(true);
    } else {
      setError(error.message);
    }
    // Somehow not working
  };

  return (
    <div className="p-3 border border-1 rounded-lg">
      <h2 className="text-lg">Password-reset</h2>
      {isSuccess && (
        <p className="text-green-600">
          Success! The Email has been send to the users Mail-address
        </p>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <Button onClick={handleResetPassword}>
        {isLoading ? 'Sending...' : 'Send link to users E-Mail'}
      </Button>
    </div>
  );
};
