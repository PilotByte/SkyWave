'use client';
import { ColumnDef } from '@tanstack/react-table';

// Test Data
// Use data from database later

export const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstname',
    header: 'First Name',
  },
  {
    accessorKey: 'lastname',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isAdmin',
    header: 'Admin',
  },
];
