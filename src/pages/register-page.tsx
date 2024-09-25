import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuth } from "@/providers/auth-provider";
import { USER_TIERS_OPTIONS } from "@/constants/auth.constant";
import { RegisterFormValues } from "@/types/auth.typs";
import { registerFormSchema } from "@/validations/auth.validations";

// Infer the type of the form values from the schema. we are using it also on AuthProvider.

// Define your form schema.

export default function RegisterPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for pending UI
  const [isPending, setIsPending] = useState(false);

  // Define your form.
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userTier: USER_TIERS_OPTIONS[0],
    },
  });

  // Define a submit handler.
  async function onSubmit(values: RegisterFormValues) {
    const { confirmPassword, ...valuesToSubmit } = values; // no need to confirmPassword for the api call
    console.log("values", values);

    try {
      setIsPending(true);
      await register(valuesToSubmit);
      toast({
        title: "Great!",
        description: "You have successfully registered.",
      });
      navigate("/auth/login");
    } catch (error: any) {
      if (error?.response?.data?.error) {
        // Check if the error is related to email already existing
        if (error.response.data.error === "Email already exists") {
          form.setError("email", {
            type: "manual",
            message: error.response.data.error,
          });
        } else {
          toast({
            title: error.response.data.error,
            description: "Please try again later.",
            variant: "destructive",
          });
        }
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
    <Card className="shadow-2xl max-w-xl w-full ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span> <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset
              disabled={isPending}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>
                      Must be at least 3 characters minimum.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
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

              <FormField
                control={form.control}
                name="userTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded-md px-3 py-2"
                      >
                        {USER_TIERS_OPTIONS.map((tier) => (
                          <option
                            key={tier}
                            value={tier}
                          >
                            {tier.charAt(0).toUpperCase() + tier.slice(1)}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <Separator className="my-8" />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Already have an account?{" "}
          <Link
            className="underline font-bold"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
