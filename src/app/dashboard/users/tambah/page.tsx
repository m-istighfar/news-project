"use client";

import { useCreateUser } from "@/services/user/useUsers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useFormWithSchema } from "@/app/hooks/useForm";
import { UserCreateSchema, type UserCreateInput } from "@/lib/validations/user";
import { FormInput } from "@/components/form";
import { BaseForm } from "@/components";
import { PrimaryButton } from "@/components/ui/primary-button";
import { FormPasswordInput } from "@/components/form/form-password-input";

export default function CreateUserPage() {
  const router = useRouter();
  const createUser = useCreateUser();

  const form = useFormWithSchema({
    schema: UserCreateSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UserCreateInput) => {
    try {
      await createUser.mutateAsync(values);
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tambah Pengguna</h1>
        <p className="text-muted-foreground mt-2">Buat pengguna baru untuk website Anda.</p>
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
              placeholder="Masukkan password"
              className="text-lg font-medium"
            />
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
