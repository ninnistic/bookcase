import { z } from "zod";

export const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must have at least 8 or more characters",
    })
    .max(20, {
      message: "Password must be between 8 and 20 characters",
    }),
});
