import { PushNotificationCard } from "@/components/custom/push-notification-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";

function UserProfilePage() {
  const { loggedInUser } = useAuth();

  const fullName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

  return (
    <div className="relative text-center sm:text-start">
      <div className="absolute bg-primary  w-full top-0 h-24 sm:h-28"></div>
      <div className="grid place-items-center sm:text-start sm:justify-start sm:items-start">
        <Avatar className="flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44">
          <AvatarImage
            className="w-full h-full object-cover"
            src={loggedInUser?.imageUrl || "src/images/user-placeholder.png"}
            alt={loggedInUser?.email}
          />
          <AvatarFallback>
            {loggedInUser?.email[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="capitalize">{fullName}</CardTitle>
        <CardDescription>{loggedInUser?.email}</CardDescription>
      </div>

      <div>
        <PushNotificationCard />
      </div>
    </div>
  );
}

export default UserProfilePage;
