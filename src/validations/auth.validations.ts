import {
  PASSWORD_MESSAGE,
  REGEX_PASSWORD,
  USER_TIERS_OPTIONS,
} from "@/constants/auth.constant";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(REGEX_PASSWORD, {
    message: PASSWORD_MESSAGE,
  }),
});

export const registerFormSchema = z
  .object({
    firstName: z.string().max(96),
    lastName: z.string().max(96),
    email: z.string().email(),
    password: z.string().min(8).regex(REGEX_PASSWORD, {
      message: PASSWORD_MESSAGE,
    }),
    confirmPassword: z.string().min(8),
    userTier: z.enum(USER_TIERS_OPTIONS),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error path
  });
