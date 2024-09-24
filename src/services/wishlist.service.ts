import api from "@/lib/api";
import { wait } from "@/lib/utils";

export async function addToWishlist(productId: number) {
  await wait();
  try {
    await api.post(`wishlist/${productId}`);
  } catch (error) {
    throw new Error("Failed to add to wishlist");
  }
}

export async function deleteFromWishlist(productId: number) {
  await wait();
  try {
    await api.delete(`wishlist/${productId}`);
  } catch (error) {
    throw new Error("Failed to remove from wishlist");
  }
}
