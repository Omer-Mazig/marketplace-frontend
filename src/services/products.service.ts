import api from "@/lib/api";
import { wait } from "@/lib/utils";
import { AddProductInput, Product } from "@/types/products.types";

export async function getAllProducts(): Promise<Product[]> {
  console.log("getting products..."); // just for development
  await wait(); // just for development

  const { data } = await api.get(`/products`);
  return data;
}

export async function getProductById(productId: number): Promise<Product> {
  console.log("getting product..."); // just for development
  await wait(); // just for development

  const { data } = await api.get(`/products/${productId}`);
  return data;
}

export async function deleteProduct(productId: number): Promise<void> {
  console.log("deleting product..."); // just for development
  await wait(); // just for development

  const { data } = await api.delete(`/products/${productId}`);
  return data;
}

export async function createProduct(input: AddProductInput): Promise<Product> {
  console.log("creating product..."); // just for development
  await wait(); // just for development

  const { data } = await api.post(`/products`, input);
  return data;
}
