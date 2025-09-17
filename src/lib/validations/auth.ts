import { z } from "zod";

// Schema untuk login
export const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

// Tipe data untuk login
export type LoginInput = z.infer<typeof LoginSchema>;

// Schema untuk registrasi
export const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

// Tipe data untuk registrasi
export type RegisterInput = z.infer<typeof RegisterSchema>;
