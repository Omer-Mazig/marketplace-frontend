// React Router
import { Link } from "react-router-dom";

// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AfterCreateProductDialogProps {
  setShouldShowAfterCreateProductDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function AfterCreateProductDialog({
  setShouldShowAfterCreateProductDialog,
}: AfterCreateProductDialogProps) {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Great!</DialogTitle>
          <DialogDescription>
            You successfully added a product to your list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            asChild
            variant="secondary"
          >
            <Link to="/user-profile/products">Back to profile</Link>
          </Button>
          <Button onClick={() => setShouldShowAfterCreateProductDialog(false)}>
            Add another product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
