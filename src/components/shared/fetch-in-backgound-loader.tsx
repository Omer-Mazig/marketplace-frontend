import { LoaderCircle } from "lucide-react";

export function FetchInBackgroundLoader() {
  return (
    <div
      className={`absolute inset-0 bg-white opacity-20 dark:bg-black dark:opacity-20`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircle className="w-16 h-16 animate-spin" />
      </div>
    </div>
  );
}
