import { z } from "zod";

// Auth validation schemas
export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'email est requis")
  .email("Veuillez entrer un email valide")
  .max(255, "L'email est trop long");

export const passwordSchema = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères")
  .max(72, "Le mot de passe est trop long");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Profile validation schemas
export const profileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .max(100, "Le prénom est trop long")
    .nullable()
    .optional(),
  last_name: z
    .string()
    .trim()
    .max(100, "Le nom est trop long")
    .nullable()
    .optional(),
  address_line1: z
    .string()
    .trim()
    .max(200, "L'adresse est trop longue")
    .nullable()
    .optional(),
  address_line2: z
    .string()
    .trim()
    .max(200, "Le complément d'adresse est trop long")
    .nullable()
    .optional(),
  city: z
    .string()
    .trim()
    .max(100, "Le nom de la ville est trop long")
    .nullable()
    .optional(),
  postal_code: z
    .string()
    .trim()
    .max(20, "Le code postal est trop long")
    .regex(/^[0-9A-Za-z\s-]*$/, "Code postal invalide")
    .nullable()
    .optional(),
  country: z
    .string()
    .trim()
    .max(100, "Le nom du pays est trop long")
    .nullable()
    .optional(),
});

// Review validation schemas
export const reviewSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre est trop long"),
  text: z
    .string()
    .trim()
    .min(10, "L'avis doit contenir au moins 10 caractères")
    .max(1000, "L'avis est trop long"),
  rating: z
    .number()
    .min(0.5, "La note minimale est 0.5")
    .max(5, "La note maximale est 5"),
});

// Helper function to safely validate and get errors
export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown): { 
  success: boolean; 
  data?: T; 
  errors?: Record<string, string>; 
} {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.issues.forEach((err) => {
    if (err.path.length > 0) {
      errors[err.path[0].toString()] = err.message;
    }
  });
  
  return { success: false, errors };
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
