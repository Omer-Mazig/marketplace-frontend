import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { UpgradePlanList } from "./upgrade-plan-list";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";

export function UpgradePlanDialog() {
  const { open, setIsOpen } = useUpgradePlanDialog();

  function onOpenChange(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl h-[80vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-4 flex-shrink-0">
          <DialogTitle>Upgrade Plan</DialogTitle>
          <DialogDescription>
            Upgrade your plan to get full access
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="p-6 pt-2">
            <UpgradePlanList />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
