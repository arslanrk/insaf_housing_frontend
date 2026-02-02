"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { useUserFormStore } from "@/stores/user-form-store";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  salary: string;
}

const addSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  email: Yup.string().trim().email("Enter a valid email").optional(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  salary: Yup.string().trim().required("Salary is required"),
});

const editSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  email: Yup.string().trim().email("Enter a valid email").optional(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  salary: Yup.string().trim().required("Salary is required"),
});

function getInitialValues(
  mode: "add" | "edit",
  user: { name: string; email: string; phone: string; salary?: number } | null
): UserFormValues {
  if (mode === "edit" && user) {
    const parts = user.name.trim().split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") ?? "";
    return {
      firstName,
      lastName,
      phoneNumber: user.phone,
      email: user.email,
      password: "",
      salary: user.salary != null ? String(user.salary) : "",
    };
  }
  return {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    salary: "",
  };
}

export function UserFormModal() {
  const { open, mode, user, closeModal } = useUserFormStore();
  const isEdit = mode === "edit";
  const schema = isEdit ? editSchema : addSchema;
  const initialValues = getInitialValues(mode, user);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-border p-0 shadow-xl sm:max-w-lg">
        <div className="border-b border-border px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Edit user" : "Add user"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {isEdit
                ? "Update user details below."
                : "Fill in the details to add a new user."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <Formik<UserFormValues>
          key={`${mode}-${user?.id ?? "new"}`}
          initialValues={initialValues}
          validationSchema={schema}
          validateOnBlur
          validateOnChange
          enableReinitialize
          onSubmit={(values) => {
            // TODO: call API to add/update user
            closeModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="space-y-4 px-6 py-6 [&_input]:h-10 [&_input]:rounded-lg">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="firstName">
                  {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...field}
                      label="First name *"
                      placeholder="First name"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...field}
                      label="Last name *"
                      placeholder="Last name"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
              </div>
              <Field name="phoneNumber">
                {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                  <FormInput
                    {...field}
                    label="Phone number *"
                    placeholder="+92 300 1234567"
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                  <FormInput
                    {...field}
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                  <FormInput
                    {...field}
                    label={isEdit ? "Password (leave blank to keep unchanged)" : "Password *"}
                    type="password"
                    placeholder={isEdit ? "••••••••" : "Min 6 characters"}
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="salary">
                {({ field, meta }: { field: any; meta: { error?: string; touched?: boolean } }) => (
                  <FormInput
                    {...field}
                    label="Salary *"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
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
                  loadingLabel={isEdit ? "Saving..." : "Adding..."}
                  className="h-10 min-h-10 rounded-lg px-4 font-medium shadow-sm sm:min-w-[7rem]"
                >
                  {isEdit ? "Save changes" : "Add user"}
                </FormButton>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
