import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center  bg-background">
      <Card className="w-full max-w-3xl mx-auto text-center">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <svg
              className="w-24 h-24 text-muted-foreground"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line
                x1="9"
                x2="9.01"
                y1="9"
                y2="9"
              />
              <line
                x1="15"
                x2="15.01"
                y1="9"
                y2="9"
              />
            </svg>
            <span className="text-3xl font-bold">404 - Page Not Found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="mt-2 text-muted-foreground">
            It might have been moved or deleted, or perhaps you mistyped the
            URL.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go back home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
