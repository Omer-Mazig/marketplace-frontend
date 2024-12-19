import api from "@/lib/api";

export async function addToWishlist(productId: number) {
  try {
    await api.post(`wishlist/${productId}`);
  } catch (error) {
    throw new Error("Failed to add to wishlist");
  }
}

export async function deleteFromWishlist(productId: number) {
  try {
    await api.delete(`wishlist/${productId}`);
  } catch (error) {
    throw new Error("Failed to remove from wishlist");
  }
}
