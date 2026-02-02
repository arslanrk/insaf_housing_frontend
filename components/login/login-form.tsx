"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdErrorOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export type LoginValues = Yup.InferType<typeof loginSchema>;

const initialValues: LoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export function LoginForm({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  return (
    <Formik<LoginValues>
      initialValues={initialValues}
      validationSchema={loginSchema}
      validateOnBlur
      validateOnChange
      onSubmit={async (values) => {
        clearError();
        await login(values.email, values.password);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form
          className={cn(
            "flex flex-col gap-5 [&_input]:h-11 [&_input]:rounded-lg",
            className
          )}
          noValidate
          aria-label="Login form"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              <MdErrorOutline className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span>{error}</span>
            </div>
          )}

          <Field name="email">
            {({
              field,
              meta,
            }: {
              field: {
                name: string;
                value: string;
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
              };
              meta: { error?: string; touched?: boolean };
            }) => (
              <FormInput
                {...field}
                label="Your Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={meta.error}
                touched={meta.touched}
                disabled={isLoading}
                icon={<MdOutlineEmail />}
              />
            )}
          </Field>

          <Field name="password">
            {({
              field,
              meta,
            }: {
              field: {
                name: string;
                value: string;
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
              };
              meta: { error?: string; touched?: boolean };
            }) => (
              <div className="space-y-1.5">
                <FormInput
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  error={meta.error}
                  touched={meta.touched}
                  disabled={isLoading}
                  icon={<MdOutlineLock />}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <MdOutlineVisibilityOff className="size-5" />
                      ) : (
                        <MdOutlineVisibility className="size-5" />
                      )}
                    </button>
                  }
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={values.rememberMe}
                      onChange={(e) =>
                        setFieldValue("rememberMe", e.target.checked)
                      }
                      className="size-4 rounded border-input accent-primary"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            )}
          </Field>

          <FormButton
            isLoading={isSubmitting || isLoading}
            loadingLabel="Signing in..."
            className="w-full rounded-lg py-6 text-base font-semibold"
          >
            Login
          </FormButton>
        </Form>
      )}
    </Formik>
  );
}
