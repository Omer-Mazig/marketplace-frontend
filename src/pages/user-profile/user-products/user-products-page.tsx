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

// Hooks
import { useDeleteProductMutation } from "@/hooks/use-delete-product-mutation";

// Types
import { Product } from "@/types/products.types";

// Contexts
import { useUserProfileContext } from "../user-profile-layout";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";

// TODO: render more info about product: wishlist amount and more
export default function UserProductsPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();
  const { openDialog } = useUpgradePlanDialog();

  if (isLoading) return <UserProductsSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  const { products } = userProfileData;

  function openUpgradePlanDialog() {
    openDialog();
  }

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
            <Link to="/products/new-product">
              <Plus /> Add New Product{" "}
            </Link>
          </Button>
          <TextWarning>
            You have reached the limit for adding products.{" "}
            <span
              onClick={openUpgradePlanDialog}
              className="cursor-pointer underline"
            >
              Click here to upgrade your plan.
            </span>
          </TextWarning>
        </div>
      </CardContent>
    </Card>
  );
}

function TextWarning({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-destructive/75 dark:text-destructive/100 text-xs">
      {children}
    </p>
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
