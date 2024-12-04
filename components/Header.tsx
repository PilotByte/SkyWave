'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/app/logo.png';
import { ThemeToggle } from './ThemeToggle';
import { createClient } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';

const Header = () => {
  const client = createClient();
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, [client]);

  const path = usePathname();

  return (
    <div className="flex h-14 items-center justify-center bg-secondary drop-shadow">
      {/* Navbar items */}
      <div className="absolute left-10">
        <Image src={logo} alt="Logo" width={40} height={40} />
      </div>
      <div className="flex justify-center w-full md:w-auto">
        {session && (
          <Tabs
            defaultValue={(function () {
              if (path.includes('dashboard')) return 'dashboard';
              if (path.includes('test')) return 'test';
              if (path.includes('admin')) return 'admin';
              if (path.includes('support')) return 'support';
              return 'dashboard';
            })()}
            className="w-[420px]"
          >
            <TabsList className="flex justify-center w-full">
              {/* Header items */}
              <Link href="/dashboard" passHref>
                <TabsTrigger value="dashboard" className="flex-1 text-center">
                  Dashboard
                </TabsTrigger>
              </Link>
              <Link href="/test/new" passHref>
                <TabsTrigger value="test" className="flex-1 text-center">
                  Test
                </TabsTrigger>
              </Link>
              <Link href="/helpdesk" passHref>
                <TabsTrigger value="statistics" className="flex-1 text-center">
                  Helpdesk
                </TabsTrigger>
              </Link>
              <Link href="/support" passHref>
                <TabsTrigger value="support" className="flex-1 text-center">
                  Support us
                </TabsTrigger>
              </Link>
              {session.user.user_metadata.isAdmin && (
                <Link href="/admin" passHref>
                  <TabsTrigger value="admin" className="flex-1 text-center">
                    Admin
                  </TabsTrigger>
                </Link>
              )}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/*Darkmode toggle */}
      <div className="absolute right-10 flex justify-center gap-3">
        <ThemeToggle />
        {session && (
          <Button variant="outline" className="font-bold text-red-500">
            <Link href="/logout">Logout</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export { Header };
