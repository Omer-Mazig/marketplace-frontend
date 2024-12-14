export function TextWarning({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-destructive/75 dark:text-destructive/100 text-xs">
      {children}
    </p>
  );
}
