"use client";

import { useCreateCategory } from "@/services/category/useCategories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { CategorySchema, type CategoryInput } from "@/lib/validations/category";
import { FormInput } from "@/components/form";
import { BaseForm } from "@/components";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function CreateCategoryPage() {
  const router = useRouter();
  const createCategory = useCreateCategory();

  const form = useFormWithSchema({
    schema: CategorySchema,
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CategoryInput) => {
    try {
      await createCategory.mutateAsync(values);
      router.push("/dashboard/kategori");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tambah Kategori</h1>
        <p className="text-muted-foreground mt-2">Buat kategori baru untuk berita website Anda.</p>
      </div>

      <BaseForm form={form} onSubmit={onSubmit} className="max-w-2xl">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <FormInput
              form={form}
              name="name"
              label="Nama Kategori"
              placeholder="Masukkan nama kategori"
              className="text-lg font-medium"
            />

            <FormInput
              form={form}
              name="slug"
              label="Slug"
              placeholder="Masukkan slug (opsional)"
              className="text-lg font-medium"
            />
            <p className="text-sm text-muted-foreground">Slug akan dibuat otomatis jika tidak diisi.</p>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Batal
            </Button>
            <PrimaryButton type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </PrimaryButton>
          </div>
        </Card>
      </BaseForm>
    </div>
  );
}
