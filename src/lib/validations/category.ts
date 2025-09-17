import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(100, "Nama kategori terlalu panjang"),
  slug: z.string().min(1, "Slug wajib diisi").max(100, "Slug terlalu panjang").optional(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;

export const CategoryUpdateSchema = CategorySchema.partial();

export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
