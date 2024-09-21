import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserProfileData } from "@/layouts/user-profile-layout";

function UserWishlistPage() {
  const { userProfileData } = useUserProfileData();

  if (!userProfileData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wishlist</CardTitle>
        <CardDescription>Products you're interested in.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {userProfileData.wishlist.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2"
            >
              <span className="mb-2 md:mb-0">{item.name}</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">${item.price.toFixed(2)}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default UserWishlistPage;
