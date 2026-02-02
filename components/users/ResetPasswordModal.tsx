"use client";

import { KeyRound } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { useResetPasswordStore } from "@/stores/reset-password-store";

const schema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

interface ResetPasswordFormValues {
  newPassword: string;
}

const initialValues: ResetPasswordFormValues = {
  newPassword: "",
};

export function ResetPasswordModal() {
  const { open, user, closeModal } = useResetPasswordStore();

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-border p-0 shadow-xl">
        <div className="px-6 py-5">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <KeyRound className="size-5" aria-hidden />
              </span>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Reset password
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
                  Set a new password for{" "}
                  <span className="font-medium text-foreground">
                    {user?.name ?? "this user"}
                  </span>
                  .
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        <Formik<ResetPasswordFormValues>
          initialValues={initialValues}
          validationSchema={schema}
          validateOnBlur
          validateOnChange
          enableReinitialize
          onSubmit={(values) => {
            // TODO: call API to reset password
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="space-y-4 px-6 py-4 [&_input]:h-10 [&_input]:rounded-lg">
                <Field name="newPassword">
                  {({
                    field,
                    meta,
                  }: {
                    field: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: (e: React.FocusEvent<HTMLInputElement>) => void };
                    meta: { error?: string; touched?: boolean };
                  }) => (
                    <FormInput
                      {...field}
                      label="New password"
                      type="password"
                      placeholder="Min 6 characters"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="h-10 min-h-10 rounded-lg px-4 font-medium sm:min-w-[6rem]"
                >
                  Cancel
                </Button>
                <FormButton
                  isLoading={isSubmitting}
                  loadingLabel="Resetting..."
                  className="h-10 min-h-10 rounded-lg px-4 font-medium sm:min-w-[7rem]"
                >
                  Reset password
                </FormButton>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
