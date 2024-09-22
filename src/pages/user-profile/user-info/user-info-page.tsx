import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useUserProfileDataQuery } from "@/hooks/useUserProfileDataQuery";
import { UserInfoSkeleton } from "./user-info-page-skeleton";
import Error from "@/components/custom/error";

function UserInfoPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileDataQuery();

  if (isLoading) return <UserInfoSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  console.log(userProfileData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>
          View and edit your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={userProfileData.imageUrl}
              alt={userProfileData.firstName}
            />
            <AvatarFallback>
              {userProfileData.firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">
              {userProfileData.firstName}
            </h2>
            <p className="text-gray-500">{userProfileData.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="Tell us about yourself"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

export default UserInfoPage;
