import { z } from "zod";


const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PHONE_PATTERN = /^\+?\d[\d\s-]{6,}$/;
const MOBILE_PATTERN = /^(?:\+91)?\d{10}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Enter your email or mobile number")
    .refine(
      (value) => EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value),
      "Enter a valid email or mobile number",
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),

    mobile: z
      .string()
      .trim()
      .regex(MOBILE_PATTERN, "Enter a valid 10-digit mobile number"),

    email: z.string().trim().email("Enter a valid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    address: z.string().trim().min(10, "Enter your full address"),

    emergencyContact: z.string().trim().optional(),

    servicePreferences: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Profile update validation
export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),

  mobile: z
    .string()
    .trim()
    .regex(MOBILE_PATTERN, "Enter a valid 10-digit mobile number"),

  email: z.string().trim().email("Enter a valid email address"),

  address: z.string().trim().min(10, "Enter your full address"),

  emergencyContact: z.string().trim().optional(),

  servicePreferences: z.array(z.string()).optional(),
});
