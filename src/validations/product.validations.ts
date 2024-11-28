import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "Price must be positive" }),
  stock: z
    .number()
    .int()
    .positive({ message: "Stock must be a positive integer" }),
  imageURL: z.string().url({ message: "Invalid URL" }).optional(),
  location: z.string().optional(),
  isNegotiable: z.boolean(),
});
