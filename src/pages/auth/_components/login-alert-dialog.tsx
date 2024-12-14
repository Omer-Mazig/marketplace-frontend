// UI components
import { LoginForm } from "@/pages/auth/_components/login-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Custom components

// Custom hooks
import { useAuth } from "@/providers/auth-provider";

export function LoginAlertDialog() {
  const {
    shouldShowLoginAlertDialog,
    setShouldShowLoginAlertDialog,
    loggedInUser,
  } = useAuth();

  function onOpenChange(isOpen: boolean) {
    console.log(isOpen);
    setShouldShowLoginAlertDialog(isOpen);
  }

  return (
    <Dialog
      open={shouldShowLoginAlertDialog && !loggedInUser}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            You need to login in order to preform these actions
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
