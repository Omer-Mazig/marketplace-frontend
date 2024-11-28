import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProductsSkeleton } from "./user-products-page-skeleton";
import Error from "@/components/custom/error";
import { useUserProfileContext } from "../user-profile-layout";
import { GenericItemRow } from "../_components/generic-item-row";
import { useDeleteProductMutation } from "@/hooks/use-delete-product-mutation";
import { Product } from "@/types/products.types";

export default function UserProductsPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();

  if (isLoading) return <UserProductsSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  const { products } = userProfileData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products</CardTitle>
        <CardDescription>Manage the products you've listed.</CardDescription>
      </CardHeader>
      <CardContent>
        {products.length ? (
          <ul className="space-y-4">
            {products.map((product) => (
              <GenericItemRow
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
              >
                <ProductItemActions product={product} />
              </GenericItemRow>
            ))}
          </ul>
        ) : (
          <p>You have no products</p>
        )}
        <div className="flex items-center mt-4">
          <Button className="w-full md:w-auto">Add New Product</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductItemActions({ product }: { product: Product }) {
  const deleteMutation = useDeleteProductMutation(product);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
      >
        Edit
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteMutation.mutate()}
      >
        Delete
      </Button>
    </>
  );
}
