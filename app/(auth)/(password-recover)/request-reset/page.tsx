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
import { sendResetEmail } from './actions';

const RequestReset = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex items-center justify-center mt-[100px] md:mt-[1/2vh]">
      <Card className="w-[850px]">
        <form>
          <CardHeader>
            <CardTitle>Password reset</CardTitle>
            <CardDescription>
              Please enter your email address to receive a password reset link.
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <p className="text-red-600 font-bold text-lg">
              {searchParams?.error}
            </p>

            <div className="flex w-full">
              <Link href={'/login'} className="flex-1 flex">
                <Button variant="ghost" className="flex-1">
                  login
                </Button>
              </Link>
              <Button className="font-bold flex-1" formAction={sendResetEmail}>
                Reset Password
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RequestReset;
