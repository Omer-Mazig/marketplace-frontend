import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  message?: string;
}

export default function Error({
  message = "An error occurred. Please try again later.",
}: ErrorProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}
