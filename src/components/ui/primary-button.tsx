"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export function PrimaryButton({ className, icon, children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
}
