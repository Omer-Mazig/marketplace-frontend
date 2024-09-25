import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuth } from "@/providers/auth-provider";
import { LoginFormValues } from "@/types/auth.typs";
import { loginFormSchema } from "@/validations/auth.validations";

// Infer the type of the form values from the schema. we are using it also on AuthProvider.

// Define your form schema.

export function LoginForm() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for pending UI
  const [isPending, setIsPending] = useState(false);

  // Define your form.
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: LoginFormValues) {
    try {
      setIsPending(true);
      await login(values);
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        form.setError("root", {
          type: "manual",
          message: "Invalid email or password.",
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={isPending}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display the error message */}
          {form.formState.errors.root && (
            <div className="text-red-600">
              {form.formState.errors.root.message}
            </div>
          )}
        </fieldset>

        <Separator className="my-8" />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
