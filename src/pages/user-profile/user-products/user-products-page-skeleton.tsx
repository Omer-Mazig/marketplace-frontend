import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProductsSkeleton() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2"
            >
              <Skeleton className="h-6 w-1/3 mb-2 md:mb-0" />
              <div className="flex flex-col 3xs:flex-row justify-center flex-wrap gap-2 w-full md:w-auto">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full md:w-40" />
      </CardFooter>
    </Card>
  );
}
