import { createContext, useContext, useState, ReactNode } from "react";

interface UpgradePlanDialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggle: () => void;
}

const UpgradePlanDialogContext = createContext<
  UpgradePlanDialogContextType | undefined
>(undefined);

export function UpgradePlanDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <UpgradePlanDialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, toggle }}
    >
      {children}
    </UpgradePlanDialogContext.Provider>
  );
}

export function useUpgradePlanDialog() {
  const context = useContext(UpgradePlanDialogContext);
  if (!context) {
    throw new Error(
      "useUpgradePlanDialog must be used within a UpgradePlanDialogProvider"
    );
  }
  return context;
}
