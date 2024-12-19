// React and React Hook Form
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { HelpCircle } from "lucide-react";

// Hooks:
import { useToast } from "@/components/ui/use-toast";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";

// Custom enums
import { ProductCategory } from "@/enums/product-category.enum";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";

// Custom components
import { Hint } from "@/components/shared/hint";
import { ProductLimitMessage } from "@/components/shared/product-limit-message";

// UI form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Custom services
import { createProduct, editProduct } from "@/services/products.service";

// Types and validations
import { AddProductFormValues, Product } from "@/types/products.types";
import { addProductFormSchema } from "@/validations/product.validations";
import { useNavigate } from "react-router-dom";

interface NewProductFormProps {
  product?: Product;
  setShouldShowAfterCreateProductDialog?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

// TODO: if user close upgrade dialog with out upgrading - redirect to user-product-page
// TODO: Error for categories
export function NewProductForm({
  product,
  setShouldShowAfterCreateProductDialog,
}: NewProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories || []
  );
  const { openDialog: openUpgradeDialog } = useUpgradePlanDialog();
  const { toast } = useToast();
  const navigate = useNavigate();

  let submitButtonText: string;

  if (isSubmitting) {
    submitButtonText = "Loading...";
  } else {
    submitButtonText = product ? "Edit" : "Add";
  }

  const categories = Object.entries(ProductCategory).map(([_key, value]) => ({
    label: value,
    value: value,
  }));

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      location: product?.location || "",
      isNegotiable: product?.isNegotiable || false,
    },
  });

  async function create(values: AddProductFormValues) {
    setIsSubmitting(true);

    try {
      await createProduct({
        ...values,
        categories: selectedCategories as unknown as ProductCategory,
      });
      setShouldShowAfterCreateProductDialog &&
        setShouldShowAfterCreateProductDialog(true);
    } catch (error: any) {
      if (error.response.data.redirectToUpgradePlan) {
        return openUpgradeDialog();
      }

      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }

    setSelectedCategories([]);
    form.reset();
  }

  async function edit(values: AddProductFormValues) {
    setIsSubmitting(true);

    try {
      await editProduct(
        {
          ...values,
          categories: selectedCategories as unknown as ProductCategory,
        },
        product?.id as number
      );

      navigate("/platform/user-profile/products");
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmit(values: AddProductFormValues) {
    if (!product) create(values);
    else edit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="isNegotiable"
            render={({ field }) => (
              <FormItem className="relative flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Negotiable</FormLabel>
                </div>

                <Hint
                  sideOffset={10}
                  description="Check if the price is negotiable."
                >
                  <HelpCircle className="h-[14px] w-[14px]" />
                </Hint>
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-3">
            <MultiSelect
              options={categories}
              onValueChange={setSelectedCategories}
              defaultValue={selectedCategories}
              placeholder="Select categories"
              variant="inverted"
              maxCount={3}
              className="h-full"
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product location"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {submitButtonText}
          </Button>

          {/* Figure out how to show this message */}
          {false && <ProductLimitMessage />}
        </div>
      </form>
    </Form>
  );
}
