"use client";

import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserStore } from "@/stores/delete-user-store";

export function DeleteUserModal() {
  const { open, user, closeModal } = useDeleteUserStore();

  const handleConfirm = () => {
    // TODO: call API to delete user
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-border p-0 shadow-xl">
        <div className="px-6 py-5">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-5" aria-hidden />
              </span>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Delete user
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-foreground">
                    {user?.name ?? "this user"}
                  </span>
                  ? This action cannot be undone.
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
            variant="destructive"
            onClick={handleConfirm}
            className="h-10 min-h-10 rounded-lg px-4 font-medium sm:min-w-[6rem]"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
