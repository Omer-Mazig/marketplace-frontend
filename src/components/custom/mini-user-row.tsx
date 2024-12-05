import { MiniUser } from "@/types/users.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MiniUserRowProps {
  user: MiniUser;
}

export function MiniUserRow({ user }: MiniUserRowProps) {
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
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xs italic text-muted-foreground">
          enter user rate here
        </div>
      </div>
    </div>
  );
}
