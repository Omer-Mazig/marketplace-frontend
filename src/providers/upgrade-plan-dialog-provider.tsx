import { createContext, useContext, useState, ReactNode } from "react";

interface UpgradePlanDialogContextType {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
  const [open, setOpen] = useState(false);

  const setIsOpen = (isOpen: boolean) => setOpen(isOpen);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <UpgradePlanDialogContext.Provider
      value={{ open, setIsOpen, openDialog, closeDialog, toggle }}
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
