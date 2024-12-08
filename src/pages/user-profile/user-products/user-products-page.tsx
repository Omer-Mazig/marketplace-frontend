// Icons
import { Trash2 } from "lucide-react";

// Router
import { Link } from "react-router-dom";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Custom components
import { UserProductsSkeleton } from "./user-products-page-skeleton";
import Error from "@/components/custom/error";
import { GenericItemRow } from "../_components/generic-item-row";

// Hooks
import { useDeleteProductMutation } from "@/hooks/use-delete-product-mutation";

// Types
import { Product } from "@/types/products.types";

// Contexts
import { useUserProfileContext } from "../user-profile-layout";

// TODO: render more info about product: wishlist amount and more
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
          <Button
            asChild
            className="w-full md:w-auto"
          >
            <Link to="/new-product">Add New Product </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductItemActions({ product }: { product: Product }) {
  const deleteProductMutation = useDeleteProductMutation(product);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteProductMutation.mutate()}
        disabled={deleteProductMutation.isPending}
        className="sm:opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </>
  );
}
