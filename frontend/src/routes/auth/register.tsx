import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { register } from "@/lib/api";
import { RegisterInput, registerSchema } from "@/validators/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [matchingPasswords, setMatchingPasswords] = useState(true);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name !== "confirmPassword" && !form.formState.dirtyFields["password"])
        return;

      setMatchingPasswords(value.password === value.confirmPassword);
    });

    return () => sub.unsubscribe();
  }, [form]);

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const handleSubmit = (data: RegisterInput) => {
    createAccount(data);
  };

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create a new account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to create a new account
            </p>
          </div>

          {isError && (
            <div className="bg-destructive text-white p-3 rounded-md text-sm">
              {error?.message || "An error occurred"}
            </div>
          )}

          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      required
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
                    <Input type="password" {...field} required />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 6 characters long
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} required />
                  </FormControl>
                  {!matchingPasswords && (
                    <FormDescription className="text-destructive">
                      Passwords do not match
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? "Creating account" : "Create account"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
