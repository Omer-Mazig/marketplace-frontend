import {
  loginFormSchema,
  registerFormSchema,
} from "@/validations/auth.validations";
import { z } from "zod";

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
