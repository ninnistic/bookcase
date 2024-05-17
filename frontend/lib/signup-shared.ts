import { z } from "zod";

export const schemaRegister = z.object({
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

export type SignupState = {
  data: z.infer<typeof schemaRegister> | null;
  zodErrors: any;
  strapiErrors: any;
  message: any;
};
