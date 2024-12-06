// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom features
import { UpgradePlanList } from "./upgrade-plan-list";

interface UpgradePlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradePlanDialog({ isOpen, onClose }: UpgradePlanDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
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
