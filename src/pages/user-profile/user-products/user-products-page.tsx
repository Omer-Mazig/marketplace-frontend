// React
import { useEffect } from "react";

// Icons
import { Plus, Trash2 } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom components
import { UserProductsSkeleton } from "./user-products-page-skeleton";
import Error from "@/components/shared/error";
import { GenericItemRow } from "../_components/generic-item-row";
import { EditProductButton } from "@/pages/products/_components/edit-product-button";
import { ProductLimitMessage } from "@/components/shared/product-limit-message";

// Hooks
import { useDeleteProductMutation } from "@/hooks/use-delete-product-mutation";

// Types
import { Product } from "@/types/products.types";

// Contexts
import { useUserProfileContext } from "../user-profile-layout";
import { isReachedProductLimit } from "@/lib/utils";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";

// TODO: breadcrump should dynmicly show route based on where user get in prodcut details
export default function UserProductsPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();

  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/products", label: "Products" },
    ]);
  }, []);

  if (isLoading) return <UserProductsSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }
  const { products, userTier } = userProfileData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products ({products.length})</CardTitle>
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
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <Button
            asChild
            className="w-full md:w-auto"
          >
            <Link to="/platform/products/new-product">
              <Plus /> Add New Product{" "}
            </Link>
          </Button>
          {isReachedProductLimit(userTier, products.length) ? (
            <ProductLimitMessage />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductItemActions({ product }: { product: Product }) {
  const deleteProductMutation = useDeleteProductMutation(product);

  return (
    <div className="sm:opacity-0 group-hover:opacity-100">
      <EditProductButton />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteProductMutation.mutate()}
              disabled={deleteProductMutation.isPending}
            >
              <Trash2 className="w-5 h-5 text-gray-400" />
              <span className="sr-only">Delete product</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete product</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
