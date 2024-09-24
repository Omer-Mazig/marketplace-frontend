import { MiniUser } from "@/types/users.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MiniUserRowProps {
  user: MiniUser;
}

export function MiniUserRow({ user }: MiniUserRowProps) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <Avatar>
        <AvatarImage
          src={user.imageUrl || ""}
          alt={user.email}
        />
        <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}
