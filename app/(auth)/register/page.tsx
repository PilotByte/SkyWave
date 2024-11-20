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
import { signup } from '../login/actions';
import Link from 'next/link';

function RegisterCard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <div className="flex items-center justify-center mt-[100px] md:mt-[1/2vh]">
        <Card className="w-[850px]">
          <form>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Type in your E-Mail and password to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input name="firstname" id="firstname" placeholder="John" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input name="lastname" id="lastname" placeholder="Toast" />
                </div>

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
                  <Input name="password" id="password" placeholder="Password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3">
              <Link href="/login">
                <p className="cursor-pointer">
                  Already have an account? Login here!
                </p>
              </Link>
              <p className="text-red-600 font-bold text-lg">
                {searchParams?.error}
              </p>
              <Button className="font-bold flex-1" formAction={signup}>
                Register
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default RegisterCard;
