import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import * as z from "zod";

interface UseFormWithSchemaProps<T extends z.ZodType> {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
}

export const useFormWithSchema = <T extends z.ZodType>({ schema, defaultValues }: UseFormWithSchemaProps<T>) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>>,
  });
};
