"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginUserAction } from "@/app/actions/auth-actions";
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

import { StrapiErrors } from "./custom/strapi-errors";
import { ZodErrors } from "./custom/zod-errors";
import { SubmitButton } from "./submit-button";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8).max(20),
});

export function SignInForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
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
        <SubmitButton className="w-full" text="Sign In" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </Form>
  );
}
