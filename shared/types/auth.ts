import { z } from "zod";

export const signupParamsSchema = z.object({
  username: z.string(),
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type SignUpParams = z.infer<typeof signupParamsSchema>;

export const signInParamsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignInParams = z.infer<typeof signInParamsSchema>;
