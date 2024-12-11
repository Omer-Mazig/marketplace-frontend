// API utility and helper functions
import api from "@/lib/api"; // Custom API utility to interact with your backend
import { wait } from "@/lib/utils"; // Utility function, likely for adding delays or timeouts

// Product types for type safety
import { AddProductInput, Product } from "@/types/products.types"; // Type definitions for product data

export async function getAllProducts({ params }: any): Promise<Product[]> {
  console.log("getting products..."); // just for development
  await wait(); // just for development

  const { data } = await api.get(`/products/category/${params}`);
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
  await wait(1500); // just for development

  const { data } = await api.post(`/products`, input);
  return data;
}
