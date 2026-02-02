"use client";

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
import { Label } from "@/components/ui/label";
import { useClientFormStore } from "@/stores/client-form-store";
import { cn } from "@/lib/utils";

export interface ClientFormValues {
  clientName: string;
  cnic: string;
  bookingDate: string;
  houseSize: string;
  societyName: string;
  status: "active" | "inactive";
}

const schema = Yup.object({
  clientName: Yup.string().trim().required("Client name is required"),
  cnic: Yup.string().trim().required("CNIC is required"),
  bookingDate: Yup.string().trim().required("Booking date is required"),
  houseSize: Yup.string().trim().required("House size is required"),
  societyName: Yup.string().trim().required("Society name is required"),
  status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
});

function getInitialValues(
  mode: "add" | "edit",
  client: {
    clientName: string;
    cnic: string;
    bookingDate: string;
    houseSize: string;
    societyName: string;
    status: "active" | "inactive";
  } | null
): ClientFormValues {
  if (mode === "edit" && client) {
    return {
      clientName: client.clientName,
      cnic: client.cnic,
      bookingDate: client.bookingDate,
      houseSize: client.houseSize,
      societyName: client.societyName,
      status: client.status,
    };
  }
  return {
    clientName: "",
    cnic: "",
    bookingDate: "",
    houseSize: "",
    societyName: "",
    status: "active",
  };
}

export function ClientFormModal() {
  const { open, mode, client, closeModal } = useClientFormStore();
  const isEdit = mode === "edit";
  const initialValues = getInitialValues(mode, client);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-border p-0 shadow-xl sm:max-w-lg">
        <div className="border-b border-border px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Edit client" : "Add client"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {isEdit
                ? "Update client details below."
                : "Fill in the details to add a new client."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <Formik<ClientFormValues>
          key={`${mode}-${client?.id ?? "new"}`}
          initialValues={initialValues}
          validationSchema={schema}
          validateOnBlur
          validateOnChange
          enableReinitialize
          onSubmit={() => {
            // TODO: call API to add/update client
            closeModal();
          }}
        >
          {({ isSubmitting, values, setFieldValue, errors, touched }) => (
            <Form className="flex flex-col">
              <div className="space-y-4 px-6 py-6 [&_input]:h-10 [&_input]:rounded-lg">
                <Field name="clientName">
                  {({ field, meta }: { field: unknown; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...(field as object)}
                      label="Client name *"
                      placeholder="Full name"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <Field name="cnic">
                  {({ field, meta }: { field: unknown; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...(field as object)}
                      label="CNIC *"
                      placeholder="35201-1234567-1"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <Field name="bookingDate">
                  {({ field, meta }: { field: unknown; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...(field as object)}
                      label="Booking date *"
                      type="text"
                      placeholder="DD-MM-YYYY"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <Field name="houseSize">
                  {({ field, meta }: { field: unknown; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...(field as object)}
                      label="House size *"
                      placeholder="e.g. 2 marla single story"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <Field name="societyName">
                  {({ field, meta }: { field: unknown; meta: { error?: string; touched?: boolean } }) => (
                    <FormInput
                      {...(field as object)}
                      label="Society name *"
                      placeholder="Society name"
                      error={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
                <div className="space-y-1.5">
                  <Label className="text-foreground/90 font-medium">Status *</Label>
                  <select
                    name="status"
                    value={values.status}
                    onChange={(e) => setFieldValue("status", e.target.value as "active" | "inactive")}
                    onBlur={() => setFieldValue("status", values.status)}
                    className={cn(
                      "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      touched.status && errors.status && "border-destructive focus-visible:ring-destructive/20"
                    )}
                    aria-invalid={Boolean(touched.status && errors.status)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {touched.status && errors.status && (
                    <p className="text-xs text-destructive font-medium" role="alert">
                      {errors.status}
                    </p>
                  )}
                </div>
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
                  {isEdit ? "Save changes" : "Add client"}
                </FormButton>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
