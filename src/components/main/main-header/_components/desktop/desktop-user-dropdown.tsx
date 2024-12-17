import { UserDropDownContent } from "@/components/shared/user-dropdown-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "react-router-dom";

interface DesktopUserDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopUserDropdown({
  isOpen,
  setIsOpen,
}: DesktopUserDropdownProps) {
  const isMobile = useIsMobile();
  const { loggedInUser } = useAuth();

  // user is still being fetched
  if (loggedInUser === undefined) {
    return <Skeleton className="rounded-full w-10 h-10" />;
  }

  // not user is logged in
  if (loggedInUser === null) {
    return (
      <Button asChild>
        <Link to="/auth/login"> Login</Link>
      </Button>
    );
  }

  // user is logged in
  const avatarFallbackText =
    loggedInUser.firstName[0].toUpperCase() +
    loggedInUser.lastName[0].toUpperCase();

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage
            src={loggedInUser.imageUrl}
            alt={loggedInUser.firstName}
          />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {!isMobile && (
        <UserDropDownContent
          sideOffset={-40}
          align="start"
          className="mt-14"
        />
      )}
    </DropdownMenu>
  );
}
