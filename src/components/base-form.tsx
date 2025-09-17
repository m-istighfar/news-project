import { Form } from "@/components/ui/form";
import { HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

import { FieldValues } from "react-hook-form";

interface BaseFormProps<T extends FieldValues> extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
}

export function BaseForm<T extends FieldValues>({ form, onSubmit, children, className, ...props }: BaseFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className} {...props}>
        {children}
      </form>
    </Form>
  );
}
