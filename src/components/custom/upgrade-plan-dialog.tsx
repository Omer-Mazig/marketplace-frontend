import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// TODO: Finish implment

interface UpgradePlanDialogProps {
  isOpen: boolean;
}

export function UpgradePlanDialog({ isOpen }: UpgradePlanDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade Plan</DialogTitle>
          <DialogDescription>
            Upgrade you plan to get full access
          </DialogDescription>
        </DialogHeader>
        <div>Enter options here...</div>
      </DialogContent>
    </Dialog>
  );
}
