interface PageHeadingProps {
  children: React.ReactNode;
}

export const PageHeading = ({ children }: PageHeadingProps) => {
  return <h1 className="text-3xl font-bold mb-6">{children}</h1>;
};
