"use client";

import * as React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FormButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingLabel?: string;
  children: React.ReactNode;
  /** Optional icon shown after the label (e.g. arrow) */
  trailingIcon?: React.ReactNode;
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      isLoading = false,
      loadingLabel = "Please wait...",
      children,
      className,
      disabled,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        type="submit"
        disabled={disabled ?? isLoading}
        className={cn(
          "min-h-12 font-semibold text-base shadow-md transition-all hover:shadow-lg",
          className
        )}
        aria-busy={isLoading}
        aria-live="polite"
        {...props}
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters
              className="size-5 shrink-0 animate-spin"
              aria-hidden
            />
            <span>{loadingLabel}</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            {trailingIcon && (
              <span className="shrink-0" aria-hidden>
                {trailingIcon}
              </span>
            )}
          </>
        )}
      </Button>
    );
  }
);

FormButton.displayName = "FormButton";

export { FormButton };
