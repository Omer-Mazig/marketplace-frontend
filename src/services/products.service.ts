// API utility and helper functions
import api from "@/lib/api"; // Custom API utility to interact with your backend

// Product types for type safety
import { AddProductInput, Product } from "@/types/products.types"; // Type definitions for product data

export async function getAllProducts({ category }: any): Promise<Product[]> {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
}

export async function getProductById(productId: number): Promise<Product> {
  const { data } = await api.get(`/products/${productId}`);
  return data;
}

export async function deleteProduct(productId: number): Promise<void> {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
}

export async function createProduct(input: AddProductInput): Promise<Product> {
  const { data } = await api.post(`/products`, input);
  return data;
}

export async function editProduct(
  input: AddProductInput,
  productId: number
): Promise<Product> {
  const { data } = await api.patch(`/products/${productId}`, input);
  return data;
}
