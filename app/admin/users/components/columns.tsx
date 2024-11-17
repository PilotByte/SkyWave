"use client";

import { ColumnDef } from "@tanstack/react-table";

// Test Data
// Use data from database later
export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
];
