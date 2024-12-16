// React
import { useEffect } from "react";

// UI components
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

// Custom components
import Error from "@/components/shared/error";
import { UserSettingsSkeleton } from "./user-settings-page-skeleton";

// Hooks
import { useUserProfileContext } from "../user-profile-layout";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";

export default function UserSettingsPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();

  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/settings", label: "Settings" },
    ]);
  }, []);

  if (isLoading) return <UserSettingsSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={userProfileData.email}
            readOnly // remove when implementing onChange
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto">Update Settings</Button>
      </CardFooter>
    </Card>
  );
}
