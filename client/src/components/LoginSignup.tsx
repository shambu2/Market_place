import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

type Props = {
  method: string;
  user: string;
};

const LoginSignup = ({ method, user }: Props) => {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>
          {" "}
          {method} to your {user} account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full border hover:cursor-pointer">
          {method}
        </Button>
        {/* <Link to={method === "Login" ? "/admin/signup" : "/admin/login"}> */}
        <Link to={(()=>{
            if(method==="Login" && user==="seller"){
                return "/admin/signup"
            }else if(method==="Signup" && user==="seller"){
                return "/admin/login"
            } else if (method === "Login" && user==="user") {
                return "/user/signup"
            } else {
                return "/user/login"
            }
        })()}>
          <p>{method === "Login" ? "Signup" : "Login"}</p>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginSignup;
