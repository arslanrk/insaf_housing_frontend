"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormInputProps
  extends Omit<React.ComponentProps<typeof Input>, "name"> {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  id?: string;
  containerClassName?: string;
  /** Icon to show at the left of the input (e.g. from react-icons) */
  icon?: React.ReactNode;
  /** Content to show at the right of the input (e.g. password visibility toggle) */
  trailing?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      error,
      touched,
      id,
      containerClassName,
      className,
      icon,
      trailing,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? name;
    const showError = Boolean(touched && error);

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className="text-foreground/90 font-medium">
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted-foreground [&>svg]:size-5 [&>svg]:shrink-0"
              aria-hidden
            >
              {icon}
            </span>
          )}
          {trailing && (
            <span className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center [&>button]:rounded-md [&>button]:p-1.5 [&>button]:text-muted-foreground [&>button]:transition-colors hover:[&>button]:text-foreground [&>button]:focus-visible:outline-none [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-ring">
              {trailing}
            </span>
          )}
          <Input
            ref={ref}
            id={inputId}
            name={name}
            aria-invalid={showError}
            aria-describedby={showError ? `${name}-error` : undefined}
            className={cn(
              icon && "pl-10",
              trailing && "pr-11",
              showError && "border-destructive focus-visible:ring-destructive/20"
            )}
            {...props}
          />
        </div>
        {showError && (
          <p
            id={`${name}-error`}
            className="text-xs text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
