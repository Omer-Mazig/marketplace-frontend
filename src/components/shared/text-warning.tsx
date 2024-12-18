import { cn } from "@/lib/utils";

interface TextWarningProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function TextWarning({
  children,
  className,
  ...props
}: TextWarningProps) {
  return (
    <p
      className={cn(
        "text-destructive/75 dark:text-destructive/100 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
