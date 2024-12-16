import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Define types for the breadcrump items and context values
type BreadcrumpItem = {
  href: string;
  label: string;
};
type SetBreadcrumpItems = (items: BreadcrumpItem[]) => void;

// Create the contexts
const BreadcrumpItemsContext = createContext<BreadcrumpItem[] | undefined>(
  undefined
);
const BreadcrumpSetItemsContext = createContext<SetBreadcrumpItems | undefined>(
  undefined
);

// Provider component
interface BreadcrumpProviderProps {
  children: ReactNode;
}

export const BreadcrumpProvider: React.FC<BreadcrumpProviderProps> = ({
  children,
}) => {
  const [items, setItemsState] = useState<BreadcrumpItem[]>([]);

  // Memoize the setter function
  const setItems = useCallback<SetBreadcrumpItems>((newItems) => {
    setItemsState(newItems);
  }, []);

  return (
    <BreadcrumpItemsContext.Provider value={items}>
      <BreadcrumpSetItemsContext.Provider value={setItems}>
        {children}
      </BreadcrumpSetItemsContext.Provider>
    </BreadcrumpItemsContext.Provider>
  );
};

// Custom hooks for consuming the contexts with error handling
export const useBreadcrumpItems = (): BreadcrumpItem[] => {
  const context = useContext(BreadcrumpItemsContext);
  if (context === undefined) {
    throw new Error(
      "useBreadcrumpItems must be used within a BreadcrumpProvider"
    );
  }
  return context;
};

export const useSetBreadcrumpItems = (): SetBreadcrumpItems => {
  const context = useContext(BreadcrumpSetItemsContext);
  if (context === undefined) {
    throw new Error(
      "useSetBreadcrumpItems must be used within a BreadcrumpProvider"
    );
  }
  return context;
};
