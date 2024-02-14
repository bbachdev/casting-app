import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export const joinSchemaBasicInfo = z.object({
  email: z.string().email({ message: "Please enter a valid email."}),
  dateOfBirth: z.date().optional(),
});

export const joinSchemaAuthInfo = z.object({
  displayName: z.string().min(2),
  password: z.string().min(12),
  passwordConfirm: z.string(),
}).refine(data => {
  let valid = true;

  //At least one uppercase letter
  if(!/[A-Z]/.test(data.password)) valid = false;
  //At least one lowercase letter
  if(!/[a-z]/.test(data.password)) valid = false;
  //At least one number
  if(!/\d/.test(data.password)) valid = false;
  //At least one special character
  if(!/[!@#\$%\^&\*]/.test(data.password)) valid = false;
  return valid;
}, {
  message: "Your password does not match the requirements. Please enter a stronger password.",
  path: ["password"]
}).
refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"]
});

export type JoinSchema = z.infer<typeof joinSchemaBasicInfo> & z.infer<typeof joinSchemaAuthInfo>;