// Third-party libraries
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

// UI components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/pages/auth/_components/login-form";

// Custom components

export default function LoginPage() {
  return (
    <Card className="shadow-2xl max-w-xl w-full ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Login</span> <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link
            className="underline font-bold"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
