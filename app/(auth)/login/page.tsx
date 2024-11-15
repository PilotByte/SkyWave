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

function LoginCard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <div>
        <div className="flex items-center justify-center h-[calc(100vh/2)]">
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
                      placeholder="Password"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-red-600 font-bold text-lg my-3">
                  {searchParams?.error}
                </p>
                <div className="flex justify-between w-full">
                  <Button variant="ghost" className="w-1/2">
                    Forgot password?
                  </Button>
                  <Button className="w-1/2 font-bold" formAction={login}>
                    Login
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
