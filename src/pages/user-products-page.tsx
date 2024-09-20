import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserProfileData } from "@/layouts/user-profile-layout";

function UserProductsPage() {
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
  ];

  const { userProfileData } = useUserProfileData();

  if (!userProfileData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products</CardTitle>
        <CardDescription>Manage the products you've listed.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2"
            >
              <span className="mb-2 md:mb-0">{product.name}</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">${product.price.toFixed(2)}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full md:w-auto">Add New Product</Button>
      </CardFooter>
    </Card>
  );
}

export default UserProductsPage;
