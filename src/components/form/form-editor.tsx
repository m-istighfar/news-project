import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormEditorProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  modules?: any;
}

export function FormEditor({ form, name, label, placeholder, className, modules }: FormEditorProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="border rounded-lg overflow-hidden bg-white">
              <ReactQuill theme="snow" modules={modules} placeholder={placeholder} className="h-[400px]" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
