"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { registerUserAction } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ZodErrors } from "./custom/zod-errors";

const INITIAL_STATE = {
  data: null,
};

const schemaRegister = z.object({
  username: z.string().min(3).max(10, {
    message: "Username must be between 3 and 10 characters",
  }),
  password: z.string().min(8).max(20, {
    message: "Password must be between 8 and 20 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function SignUpForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );
  console.log(formState);

  const form = useForm<z.infer<typeof schemaRegister>>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof schemaRegister>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        action={formAction}
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" {...field} />
              </FormControl>
              <ZodErrors error={formState?.zodErrors?.username} />
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
                  placeholder="somebody@example.com"
                  {...field}
                />
              </FormControl>
              <ZodErrors error={formState?.zodErrors?.email} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <ZodErrors error={formState?.zodErrors?.password} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
