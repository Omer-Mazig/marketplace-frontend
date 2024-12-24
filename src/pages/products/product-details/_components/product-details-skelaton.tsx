import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px] w-full" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
