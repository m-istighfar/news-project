import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFileUploadProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  accept?: string;
  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
}

export function FormFileUpload({
  form,
  name,
  label,
  accept,
  className,
  labelClassName,
  wrapperClassName,
  children,
}: FormFileUploadProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>
            <div className={cn("border rounded-lg p-4 bg-muted/50", wrapperClassName)}>
              {children}
              <Input
                type="file"
                accept={accept}
                className="cursor-pointer bg-white"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
