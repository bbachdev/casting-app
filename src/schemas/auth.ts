import { z } from 'zod';

//TODO: Add more, custom validation for password
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});