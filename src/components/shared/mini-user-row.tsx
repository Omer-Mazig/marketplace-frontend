// UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";

// Custom types
import { MiniUser } from "@/types/users.types";

interface MiniUserRowProps {
  user: MiniUser;
}

export function MiniUserRow({ user }: MiniUserRowProps) {
  const { loggedInUser } = useAuth();
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage
          src={user.imageUrl || ""}
          alt={user.email}
        />
        <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-semibold">
          {user.firstName} {user.lastName}{" "}
          {loggedInUser?.id === user.id && <span>{"(You)"}</span>}
        </div>
        <div className="text-xs italic text-muted-foreground">
          enter user rate here
        </div>
      </div>
    </div>
  );
}
