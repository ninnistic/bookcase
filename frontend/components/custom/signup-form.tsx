"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { registerUserAction } from "@/app/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaRegister } from "@/lib/signup-shared";
import { SignupState } from "@/lib/signup-shared";

import { StrapiErrors } from "./strapi-errors";
import { SubmitButton } from "./submit-button";
import { ZodErrors } from "./zod-errors";

const INITIAL_STATE: SignupState = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

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

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
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
        <SubmitButton
          className="w-full"
          text="Sign Up"
          loadingText="Loading..."
        />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </Form>
  );
}
