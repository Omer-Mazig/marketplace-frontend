// API utility and helper functions
import api from "@/lib/api"; // Custom API utility to interact with your backend
import { NotFoundError } from "@/types/errors";

// Product types for type safety
import { AddProductInput, Product } from "@/types/products.types"; // Type definitions for product data

// TODO: fix type any
export async function getAllProducts({ category }: any): Promise<Product[]> {
  try {
    const { data } = await api.get(`/products/category/${category}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getProductById(productId: number): Promise<Product> {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new NotFoundError("Product not found");
    }
    throw error;
  }
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
