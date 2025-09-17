import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
}

export function FormInput({
  form,
  name,
  label,
  placeholder,
  type = "text",
  className,
  labelClassName,
  inputWrapperClassName,
}: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>
            <div className={inputWrapperClassName}>
              <Input type={type} placeholder={placeholder} {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
