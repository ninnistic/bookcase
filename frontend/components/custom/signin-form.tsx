"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginUserAction } from "@/app/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaLogin } from "@/lib/signin-shared";

import { StrapiErrors } from "./strapi-errors";
import { SubmitButton } from "./submit-button";
import { ZodErrors } from "./zod-errors";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SignInForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  const form = useForm<z.infer<typeof schemaLogin>>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Username or Email" {...field} />
              </FormControl>
              <ZodErrors error={formState?.zodErrors?.identifier} />
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
        <SubmitButton className="w-full" text="Sign In" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </Form>
  );
}
