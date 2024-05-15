"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { registerUserService } from "../services/auth-service";
import { loginUserService } from "../services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
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

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields, Failed to Register User",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);
  redirect("/dashboard");
}

const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must have at least 6 or more characters",
    })
    .max(20, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);

  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
