"use client";

import { useCategory, useUpdateCategory } from "@/services/category/useCategories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { CategoryUpdateSchema, type CategoryUpdateInput } from "@/lib/validations/category";
import { FormInput } from "@/components/form";
import { BaseForm } from "@/components";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useEffect } from "react";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: categoryData } = useCategory(id as string);
  const updateCategory = useUpdateCategory(id as string);

  const form = useFormWithSchema({
    schema: CategoryUpdateSchema,
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.name);
      setValue("slug", categoryData.slug);
    }
  }, [categoryData, setValue]);

  const onSubmit = async (values: CategoryUpdateInput) => {
    try {
      await updateCategory.mutateAsync(values);
      router.push("/dashboard/kategori");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  if (!categoryData) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
          <p className="text-sm text-muted-foreground">Memuat kategori...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Kategori</h1>
        <p className="text-muted-foreground mt-2">Memperbarui kategori: {categoryData.name}</p>
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
              Simpan Perubahan
            </PrimaryButton>
          </div>
        </Card>
      </BaseForm>
    </div>
  );
}
