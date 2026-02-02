"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  Pencil,
  Trash2,
  Plus,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useClientFormStore } from "@/stores/client-form-store";
import { useDeleteClientStore } from "@/stores/delete-client-store";
import { useChangeStatusClientStore } from "@/stores/change-status-client-store";
import { ClientFormModal } from "@/components/clients/ClientFormModal";
import { DeleteClientModal } from "@/components/clients/DeleteClientModal";
import { ChangeStatusClientModal } from "@/components/clients/ChangeStatusClientModal";
import { MOCK_CLIENTS } from "@/lib/mock-clients";
import type { Client as ClientType } from "@/lib/mock-clients";

const PAGE_SIZE = 10;

function StatusBadge({ status }: { status: ClientType["status"] }) {
  if (status === "active") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
        title="Active"
      >
        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
        Active
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
      title="Inactive"
    >
      <XCircle className="size-3.5 shrink-0" aria-hidden />
      Inactive
    </span>
  );
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const openModal = useClientFormStore((s) => s.openModal);
  const openDeleteModal = useDeleteClientStore((s) => s.openModal);
  const openChangeStatusModal = useChangeStatusClientStore((s) => s.openModal);

  const filteredClients = useMemo(() => {
    if (!search.trim()) return MOCK_CLIENTS;
    const q = search.trim().toLowerCase();
    return MOCK_CLIENTS.filter(
      (c) =>
        c.clientName.toLowerCase().includes(q) ||
        c.cnic.replace(/-/g, "").includes(q.replace(/-/g, "")) ||
        c.societyName.toLowerCase().includes(q) ||
        c.houseSize.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredClients.slice(start, start + PAGE_SIZE);
  }, [filteredClients, currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Clients
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage client bookings and details
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:shrink-0">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search by name, CNIC, society..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 rounded-lg border-border bg-background pl-9 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/20"
              aria-label="Search clients"
            />
          </div>
          <Button
            className="h-10 shrink-0 gap-2 rounded-lg font-medium shadow-sm transition-colors hover:opacity-90"
            aria-label="Add client"
            onClick={() => openModal("add")}
          >
            <Plus className="size-4" />
            Add client
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Client name
              </TableHead>
              <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CNIC
              </TableHead>
              <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Booking date
              </TableHead>
              <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                House size
              </TableHead>
              <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Society name
              </TableHead>
              <TableHead className="w-[4rem] px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClients.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Users className="size-7" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">No clients found</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or add a new client.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedClients.map((client, index) => (
                <TableRow
                  key={client.id}
                  className={cn(
                    "border-border transition-colors hover:bg-muted/50",
                    index % 2 === 1 && "bg-muted/30"
                  )}
                >
                  <TableCell className="px-5 py-4 font-medium text-foreground">
                    {client.clientName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {client.cnic}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {client.bookingDate}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-muted-foreground">
                    {client.houseSize}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-muted-foreground">
                    {client.societyName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/20"
                          aria-label="Open actions menu"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/clients/${client.id}`}
                            className="flex cursor-pointer items-center"
                          >
                            <User className="mr-2 size-4" />
                            View profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openChangeStatusModal(client)}>
                          <ToggleLeft className="mr-2 size-4" />
                          Change status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openModal("edit", client)}>
                          <Pencil className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => openDeleteModal(client)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {filteredClients.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-border bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filteredClients.length)} of{" "}
              {filteredClients.length} clients
            </p>
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={cn(
                      "rounded-lg transition-colors",
                      currentPage === 1 && "pointer-events-none opacity-50"
                    )}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                      className="rounded-lg min-w-9 transition-colors"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={cn(
                      "rounded-lg transition-colors",
                      currentPage === totalPages && "pointer-events-none opacity-50"
                    )}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <ClientFormModal />
      <DeleteClientModal />
      <ChangeStatusClientModal />
    </div>
  );
}
