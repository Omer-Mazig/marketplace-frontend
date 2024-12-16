// Third-party libraries
import {
  USER_GOLD_PRODUCT_LIMIT,
  USER_STANDARD_PRODUCT_LIMIT,
} from "@/constants/user.constant";
import { UserTierOptionType } from "@/types/users.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(time = 500) {
  return await new Promise((res) => setTimeout(res, time));
}

export function isReachedProductLimit(
  tier: UserTierOptionType,
  productAmount: number
) {
  if (tier === "standard" && productAmount >= USER_STANDARD_PRODUCT_LIMIT)
    return true;
  if (tier === "gold" && productAmount >= USER_GOLD_PRODUCT_LIMIT) return true;
  return false;
}

export function capitalize(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
