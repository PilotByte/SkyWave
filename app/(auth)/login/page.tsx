// Login card imports
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
import { login } from './actions';
import Link from 'next/link';

function LoginCard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex items-center justify-center mt-[100px] md:mt-[1/2vh]">
      <Card className="w-[850px]">
        <form>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Use your E-Mail and password to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="pilot@flightschool.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link href="/register" className="w-full">
              <p className="cursor-pointer">No account yet? Register now!</p>
            </Link>
            <p className="text-red-600 font-bold text-lg">
              {searchParams?.error}
            </p>
            <p className="font-bold text-lg">{searchParams?.info}</p>
            <div className="flex w-full">
              <Link href={'/request-reset'} className="flex-1 flex">
                <Button variant="ghost" className="flex-1">
                  Forgot password?
                </Button>
              </Link>
              <Button className="font-bold flex-1" formAction={login}>
                Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginCard;
