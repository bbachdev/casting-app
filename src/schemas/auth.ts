import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export const joinSchemaBasicInfo = z.object({
  email: z.string().email({ message: "Please enter a valid email."}),
  dateOfBirth: z.date().optional(),
});

//TODO: Add more, custom validation for password
export const joinSchemaAuthInfo = z.object({
  displayName: z.string().min(2),
  password: z.string().min(12),
  passwordConfirm: z.string().min(12),
});

export type JoinSchema = z.infer<typeof joinSchemaBasicInfo> & z.infer<typeof joinSchemaAuthInfo>;