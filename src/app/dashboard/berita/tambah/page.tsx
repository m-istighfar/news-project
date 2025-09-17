"use client";

import { useCreateArticle } from "@/services/article/useArticles";
import { useCategories } from "@/services/category/useCategories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { ArticleCreateSchema, type ArticleCreateInput } from "@/lib/validations/article";
import { modules } from "@/app/constants/quill";
import { FormEditor, FormSelect, FormFileUpload, FormInput } from "@/components/form";
import { BaseForm } from "@/components";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function CreateArticlePage() {
  const router = useRouter();
  const { data: categoriesData } = useCategories(1, undefined, 100);
  const createArticle = useCreateArticle();

  const form = useFormWithSchema({
    schema: ArticleCreateSchema,
    defaultValues: {
      status: "published",
      content: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ArticleCreateInput) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await createArticle.mutateAsync(formData);
      router.push("/dashboard/berita");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tambah Berita</h1>
        <p className="text-muted-foreground mt-2">Buat berita baru untuk website Anda.</p>
      </div>

      <BaseForm form={form} onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <FormInput
              form={form}
              name="title"
              label="Judul"
              placeholder="Masukkan judul berita"
              className="text-lg font-medium"
            />

            <FormEditor
              form={form}
              name="content"
              label="Konten"
              placeholder="Tulis konten berita Anda di sini..."
              modules={modules}
            />
          </div>
        </Card>

        <Card className="h-fit p-6 space-y-6 sticky top-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Pengaturan Berita</h2>
            <div className="space-y-4">
              <FormSelect
                form={form}
                name="categoryId"
                label="Kategori"
                placeholder="Pilih kategori"
                options={
                  categoriesData?.items?.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })) || []
                }
              />

              <FormFileUpload form={form} name="image" label="Gambar Sampul" accept="image/*" className="space-y-2" />

              <FormSelect
                form={form}
                name="status"
                label="Status"
                placeholder="Pilih status"
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Terbit", value: "published" },
                ]}
              />
            </div>
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
