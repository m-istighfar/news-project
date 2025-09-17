import { z } from "zod";

// Schema for creating a new article
export const ArticleCreateSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(255, "Judul terlalu panjang"),
  content: z.string().min(1, "Konten wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  status: z.enum(["draft", "published"]).default("draft"),
  image: z.custom<File>((value) => {
    return value instanceof File;
  }, "Gambar wajib diunggah"),
});

// Schema for updating an article
export const ArticleUpdateSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(255, "Judul terlalu panjang").optional(),
  content: z.string().min(1, "Konten wajib diisi").optional(),
  categoryId: z.string().min(1, "Kategori wajib dipilih").optional(),
  status: z.enum(["draft", "published"]).optional(),
  image: z.instanceof(File).optional(),
});

// Types
export type ArticleCreateInput = z.infer<typeof ArticleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof ArticleUpdateSchema>;
