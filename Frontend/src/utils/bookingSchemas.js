import { z } from "zod";

// Zod schemas for the Booking flow's genuine form-input steps (Date,
// Location, Requirements). The pick-one-of-several steps (Service, Package,
// Time, Duration) are plain selectable grids — there's no free-text input
// to validate there, so they don't need a schema; a disabled "Continue"
// until something is selected is enough.

const todayIso = () => new Date().toISOString().slice(0, 10);

export const dateSchema = z.object({
  date: z
    .string()
    .min(1, "Please choose a date")
    .refine(
      (value) => value >= todayIso(),
      "Please choose a date from today onward",
    ),
});

export const locationSchema = z.object({
  address: z.string().trim().min(5, "Enter your full address"),
  city: z.string().trim().min(2, "Enter your city"),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  landmark: z.string().trim().optional(),
});

export const requirementsSchema = z.object({
  notes: z.string().trim().max(500, "Keep it under 500 characters").optional(),
});
