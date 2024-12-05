import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UpgradePlanList } from "./upgrade-plan-list";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl max-h-[80vh] p-0">
        <ScrollArea className="max-h-[80vh] overflow-y-auto">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>
              Upgrade your plan to get full access
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <UpgradePlanList />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
