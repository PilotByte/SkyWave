// Login card imports
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginCard() {
  return (
    <div>
      <div className="flex items-center justify-center h-[calc(100vh/2)]">
        <Card className="w-[850px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Use your E-Mail address and password to log in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">E-Mail</Label>
                  <Input id="name" placeholder="pilot@example.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input id="name" placeholder="Password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" className="w-1/2">Forgot password?</Button>
            <Button className="w-1/2">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginCard