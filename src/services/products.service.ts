import api from "@/lib/api";
import { Product } from "@/types/products.types";

export async function getAllProducts(): Promise<Product[]> {
  console.log("getting user data..."); // just for development
  await new Promise((res) => setTimeout(res, 2000)); // just for development

  const { data } = await api.get(`/users/user-data`);
  return data;
}
