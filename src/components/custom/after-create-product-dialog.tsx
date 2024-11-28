import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface AfterCreateProductDialogProps {
  setAfterCreateProductDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AfterCreateProductDialog({
  setAfterCreateProductDialog,
}: AfterCreateProductDialogProps) {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Great!</DialogTitle>
          <DialogDescription>
            You seccesfuly added a product to your list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            asChild
            variant="secondary"
          >
            <Link to="/user-profile/products">Back to profile</Link>
          </Button>
          <Button onClick={() => setAfterCreateProductDialog(false)}>
            Add another product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
