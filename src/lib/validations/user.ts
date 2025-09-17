import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const UserUpdateSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password minimal 6 karakter",
    }),
});

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
