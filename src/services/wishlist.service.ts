import api from "@/lib/api";
import { wait } from "@/lib/utils";

export async function addToWishlist(productId: number) {
  await wait();
  api.post("wishlist/" + productId);
}

export async function deleteFromWishlist(productId: number) {
  await wait();
  api.delete("wishlist/" + productId);
}
