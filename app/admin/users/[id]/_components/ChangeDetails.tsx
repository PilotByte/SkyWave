'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';
import { useEffect, useState } from 'react';

export const ChangeDetailsForm = ({ id }: { id: string }) => {
  const supabase = createClient();
  const [user, setUser] = useState<
    Partial<Database['public']['Tables']['profiles']['Row']>
  >({
    id: id,
    email: '',
    firstname: '',
    lastname: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, [id, supabase]);

  const handleSave = async () => {
    setIsLoading(true);
    const { error } = await supabase.from('profiles').update(user).eq('id', id);

    console.log(error);
    setIsLoading(false);
    if (!error) {
      setIsSuccess(true);
    } else {
      setError(error.message);
    }
  };

  return (
    <div className="p-3 border border-1 rounded-lg space-y-3">
      <h2 className="text-lg">User details</h2>

      <div>
        <label>Email</label>
        <Input
          type="text"
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="text"
          value={user.firstname || ''}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="text"
          value={user.lastname || ''}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        />
      </div>

      {isSuccess && <p className="text-green-600">Saved!</p>}
      {error && <p className="text-red-600">{error}</p>}
      <Button onClick={handleSave}>{isLoading ? 'Loading...' : 'Save'}</Button>
    </div>
  );
};
