import { z } from "zod";

export const userOptional = z.object({
  email: z.optional(z.string().email()),
  name: z.optional(z.string()),
  password: z.optional(z.string().min(6)),
});

export const userSchemaRequired = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }).min(6),
});

export const userSchema = z.object({
  ...userOptional.shape,
  ...userSchemaRequired.shape,
  createdAt:z.date(),
  updatedAt:z.date()
});
export type User = z.infer<typeof userSchema> & { id?: number };
export type UserData = z.infer<typeof userSchemaRequired>;
export type UserDataOptional = z.infer<typeof userOptional>;
