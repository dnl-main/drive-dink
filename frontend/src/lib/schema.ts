import { z } from "zod";

export const DIVISIONS = [
  { id: "novice", label: "Non-Gender Novice", solo: true, fee: 2500 },
  { id: "mixed", label: "Mixed Doubles", solo: false, fee: 2500 },
  { id: "womens", label: "Women's Doubles", solo: false, fee: 2500 },
  { id: "mens", label: "Men's Doubles", solo: false, fee: 2500 },
] as const;

export type DivisionId = (typeof DIVISIONS)[number]["id"];

export const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const CATEGORIES = [
  {
    id: "novice",
    label: "Novice",
    description: "New to the game or under 6 months of regular play.",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    description: "Comfortable with dinks, drops, and consistent rallies.",
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Tournament-tested, aggressive net play, strong strategy.",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// Mocked static availability. Doubles = 16 pairs, Solo (novice division) = 32 players.
// Split per category (novice / intermediate / advanced).
export const SLOTS_LEFT: Record<DivisionId, Record<CategoryId, number>> = {
  novice: { novice: 9, intermediate: 5, advanced: 3 },
  mixed: { novice: 4, intermediate: 6, advanced: 2 },
  womens: { novice: 5, intermediate: 3, advanced: 1 },
  mens: { novice: 6, intermediate: 4, advanced: 0 },
};

const phRegex = /^(\+?63|0)?9\d{9}$/;

const playerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter full name").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().regex(phRegex, "Enter a valid PH mobile (09XXXXXXXXX)"),
  shirtSize: z.enum(SHIRT_SIZES),
});

export const registrationSchema = z
  .object({
    division: z.enum(["novice", "mixed", "womens", "mens"]),
    category: z.enum(["novice", "intermediate", "advanced"], {
        message: "Select a skill category",
    }),
    player1: playerSchema,
    player2: playerSchema.optional(),
    emergencyName: z.string().trim().max(80).optional().or(z.literal("")),
    emergencyPhone: z.string().trim().max(20).optional().or(z.literal("")),
    gcashReference: z
      .string()
      .trim()
      .min(6, "Enter your GCash reference number")
      .max(40),
    agree: z.literal(true, { message: "You must accept the terms" }),
  })
  .refine(
    (data) => data.division === "novice" || !!data.player2,
    { message: "Partner is required for doubles divisions", path: ["player2"] },
  );

export type RegistrationInput = z.infer<typeof registrationSchema>;

export interface Registration extends RegistrationInput {
  id: string;
  createdAt: string;
  fee: number;
}