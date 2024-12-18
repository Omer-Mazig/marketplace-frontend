import { Skeleton } from "@/components/ui/skeleton";

export function NewProductFormSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="relative flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="absolute right-2 h-[14px] w-[14px] rounded-full" />
        </div>
        <div className="col-span-1 md:col-span-3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <Skeleton className="h-10 w-full md:w-32" />
        <Skeleton className="h-4 w-full md:w-64" />
      </div>
    </div>
  );
}
