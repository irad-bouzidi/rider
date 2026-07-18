import { z } from 'zod';
export const loginSchema = z.object({ email: z.string().email('Invalid email'), password: z.string().min(8, 'Password must be at least 8 characters') });
export const registerSchema = z.object({
  fullName: z.string().min(2), email: z.string().email(),
  phone: z.string().min(10).regex(/^\+?[\d\s-]{7,15}$/),
  password: z.string().min(8), confirmPassword: z.string().min(8),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });
export const forgotPasswordSchema = z.object({ email: z.string().email() });
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
