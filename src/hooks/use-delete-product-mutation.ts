// Third-party libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Services
import { deleteProduct } from "@/services/products.service";

// Custom hooks
import { useToast } from "@/components/ui/use-toast";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Types
import { Product } from "@/types/products.types";
import { UserProfileData } from "@/types/users.types";

export function useDeleteProductMutation(product: Product) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => deleteProduct(product.id),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_DICT.USER_PROFILE_DATA],
      });

      const previousData = queryClient.getQueryData([
        QUERY_KEY_DICT.USER_PROFILE_DATA,
      ]);

      queryClient.setQueryData<UserProfileData>(
        [QUERY_KEY_DICT.USER_PROFILE_DATA],
        (data) => {
          if (!data) return;
          return {
            ...data,
            products: data.products.filter((p) => p.id !== product.id),
          };
        }
      );

      return { previousData };
    },

    onError: (err, _variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_DICT.USER_PROFILE_DATA],
      });

      toast({
        variant: "destructive",
        title: err?.message || "Something went wrong.",
        description: `There was a problem removing this product. Please try again later.`,
      });
    },

    onSuccess: () => {
      toast({
        description: `${product.name} was removed from your products.`,
      });
      // for UX improvment:
      // if a product is removed it sholld not be cached
      // TODO: fix wierd navigatin, seems like it also handle the navigation history but not intuitivly
      queryClient.removeQueries({
        queryKey: [QUERY_KEY_DICT.PRODUCT, { productId: product.id }],
      });
      queryClient.clear;
    },
  });
}
