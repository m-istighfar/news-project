"use client";

import { useArticle, useUpdateArticle } from "@/services/article/useArticles";
import { useCategories } from "@/services/category/useCategories";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useEffect } from "react";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { ArticleUpdateSchema, type ArticleUpdateInput } from "@/lib/validations/article";
import { FormEditor, FormInput, FormSelect, FormFileUpload } from "@/components/form";
import { BaseForm } from "@/components";
import { modules } from "@/app/constants/quill";
import { useState } from "react";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: articleData } = useArticle(id as string);
  const { data: categoriesData } = useCategories(1, undefined, 100);
  const updateArticle = useUpdateArticle(id as string);
  const [previewImage, setPreviewImage] = useState<string>("");

  const form = useFormWithSchema({
    schema: ArticleUpdateSchema,
    defaultValues: {
      status: articleData?.status || "draft",
      content: articleData?.content || "",
      categoryId: articleData?.categoryId || "",
      title: articleData?.title || "",
    },
  });

  useEffect(() => {
    if (articleData?.imageUrl) {
      setPreviewImage(articleData.imageUrl);
    }
  }, [articleData]);

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (articleData) {
      setValue("title", articleData.title);
      setValue("content", articleData.content);
      setValue("categoryId", articleData.categoryId);
      setValue("status", articleData.status);
      if (articleData.imageUrl) {
        setPreviewImage(articleData.imageUrl);
      }
    }
  }, [articleData, setValue]);

  const onSubmit = async (values: ArticleUpdateInput) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await updateArticle.mutateAsync(formData);
      router.push("/dashboard/berita");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  if (!articleData) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
          <p className="text-sm text-muted-foreground">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Berita</h1>
        <p className="text-muted-foreground mt-2">Memperbarui berita: {articleData.title}</p>
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

              <FormFileUpload
                form={form}
                name="image"
                label="Gambar Sampul"
                accept="image/*"
                className="space-y-2"
                wrapperClassName="space-y-2"
              >
                {previewImage && <img src={previewImage} alt="Preview" className="max-h-32 rounded-md object-cover" />}
              </FormFileUpload>

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
              Simpan Perubahan
            </PrimaryButton>
          </div>
        </Card>
      </BaseForm>
    </div>
  );
}
