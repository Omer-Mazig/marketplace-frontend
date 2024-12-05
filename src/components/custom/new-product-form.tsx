import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCategory } from "@/enums/product-category.enum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { AddProductFormValues } from "@/types/products.types";
import { addProductFormSchema } from "@/validations/product.validations";
import { createProduct } from "@/services/products.service";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const categories = Object.entries(ProductCategory).map(([key, value]) => ({
  // TODO: Remove this and make some better solution
  //   value: key.toLowerCase().replace(/_/g, "-"), // Converts the key to a kebab-case format
  label: value, // The enum value is used directly as the label
  value: value,
}));

interface NewProductFormProps {
  setAfterCreateProductDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewProductForm({
  setAfterCreateProductDialog,
}: NewProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imageURL: "",
      location: "",
      isNegotiable: false,
    },
  });

  async function onSubmit(values: AddProductFormValues) {
    setIsSubmitting(true);

    try {
      const newProduct = await createProduct({
        ...values,
        categories: selectedCategories as unknown as ProductCategory,
      });
    } catch (error: any) {
      console.log(error);

      if (error.response.data.redirectToUpgradePlan) {
        return navigate("/");
      }

      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
    setAfterCreateProductDialog && setAfterCreateProductDialog(true);

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
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

        <div className="grid grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="isNegotiable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Negotiable</FormLabel>
                  <FormDescription>
                    Check this if the price is negotiable
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <MultiSelect
            options={categories}
            onValueChange={setSelectedCategories}
            defaultValue={selectedCategories}
            placeholder="Select categories"
            variant="inverted"
            maxCount={3}
          />
        </div>

        {/* TODO: replace to an image uplaod component */}
        <FormField
          control={form.control}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
