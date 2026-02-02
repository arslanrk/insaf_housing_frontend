"use client";

import { ToggleLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useChangeStatusStore } from "@/stores/change-status-store";
import { cn } from "@/lib/utils";

export function ChangeStatusModal() {
  const { open, user, newStatus, closeModal } = useChangeStatusStore();

  const handleConfirm = () => {
    // TODO: call API to update user status
    closeModal();
  };

  if (!newStatus) return null;

  const isActivating = newStatus === "active";

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-border p-0 shadow-xl">
        <div className="px-6 py-5">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  isActivating ? "bg-success/10 text-success" : "bg-red-100 text-red-600"
                )}
              >
                <ToggleLeft className="size-5" aria-hidden />
              </span>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Change status
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
                  Are you sure you want to change the status of{" "}
                  <span className="font-medium text-foreground">
                    {user?.name ?? "this user"}
                  </span>{" "}
                  to{" "}
                  <span
                    className={cn(
                      "font-medium",
                      isActivating ? "text-success" : "text-red-600"
                    )}
                  >
                    {isActivating ? "Active" : "Inactive"}
                  </span>
                  ?
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
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
          <Button
            type="button"
            onClick={handleConfirm}
            className="h-10 min-h-10 rounded-lg px-4 font-medium sm:min-w-[6rem]"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
