interface PageHeadingProps {
  children: React.ReactNode;
  subTitle?: React.ReactNode;
}

export const PageHeading = ({ children, subTitle }: PageHeadingProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold capitalize">{children}</h1>
      {subTitle}
    </div>
  );
};
