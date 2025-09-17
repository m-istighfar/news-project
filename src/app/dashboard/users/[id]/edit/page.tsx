"use client";

import { useUser, useUpdateUser } from "@/services/user/useUsers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { UserUpdateSchema, type UserUpdateInput } from "@/lib/validations/user";
import { FormInput } from "@/components/form";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { BaseForm } from "@/components";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useEffect } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: userData } = useUser(id as string);
  const updateUser = useUpdateUser(id as string);

  const form = useFormWithSchema({
    schema: UserUpdateSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
    }
  }, [userData, setValue]);

  const onSubmit = async (values: UserUpdateInput) => {
    try {
      await updateUser.mutateAsync(values);
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  if (!userData) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
          <p className="text-sm text-muted-foreground">Memuat pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Pengguna</h1>
        <p className="text-muted-foreground mt-2">Memperbarui pengguna: {userData.name}</p>
      </div>

      <BaseForm form={form} onSubmit={onSubmit} className="max-w-2xl">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <FormInput
              form={form}
              name="name"
              label="Nama"
              placeholder="Masukkan nama pengguna"
              className="text-lg font-medium"
            />

            <FormInput
              form={form}
              name="email"
              type="email"
              label="Email"
              placeholder="Masukkan email pengguna"
              className="text-lg font-medium"
            />

            <FormPasswordInput
              form={form}
              name="password"
              label="Password"
              placeholder="Masukkan password baru (opsional)"
              className="text-lg font-medium"
            />
            <p className="text-sm text-muted-foreground">Biarkan kosong jika tidak ingin mengubah password.</p>
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
