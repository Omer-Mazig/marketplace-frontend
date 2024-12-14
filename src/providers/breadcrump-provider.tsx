import React, { createContext, useContext, useState, useCallback } from "react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbContextType = {
  items: BreadcrumbItem[];
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  const setBreadcrumbItems = useCallback((newItems: BreadcrumbItem[]) => {
    setItems(newItems);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ items, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}
