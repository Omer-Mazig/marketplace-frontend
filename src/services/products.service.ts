import api from "@/lib/api";
import { wait } from "@/lib/utils";
import { Product } from "@/types/products.types";

export async function getAllProducts(): Promise<Product[]> {
  console.log("getting products..."); // just for development
  await wait(); // just for development

  const { data } = await api.get(`/products`);
  return data;
}
