'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Question } from '@/app/types/question';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { TableToolbar } from './toolbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableFooter } from './footer';
import { useSearchParams } from 'next/navigation';
import { SubSubject } from '@/app/types/Subject';
import { Import } from '@/app/types/imports';

interface QuestionTableProps {
  questions: (PocketBaseRecord<Question> & {
    expand: {
      sub_subjects_via_questions: PocketBaseRecord<SubSubject>[];
      imports_via_questions: PocketBaseRecord<Import>[];
    };
  })[];
  columns: ColumnDef<
    PocketBaseRecord<Question> & {
      expand: {
        sub_subjects_via_questions: PocketBaseRecord<SubSubject>[];
        imports_via_questions: PocketBaseRecord<Import>[];
      };
    }
  >[];
  subSubjects: PocketBaseRecord<SubSubject>[];
}

export const QuestionTable = ({
  questions,
  columns,
  subSubjects,
}: QuestionTableProps) => {
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const pool = searchParams.get('pool');
    const empty = searchParams.get('empty');
    const importFilter = searchParams.get('import');
    if (pool) {
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== 'lmsQuestionPool'),
        { id: 'lmsQuestionPool', value: [pool] },
      ]);
    }
    if (empty) {
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== 'sub_subjects'),
        { id: 'sub_subjects', value: [''] },
      ]);
    }
    if (importFilter) {
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== 'imports'),
        { id: 'imports', value: [importFilter] },
      ]);
    }
  }, [searchParams]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    imports: false,
    questionType: false,
  });
  const table = useReactTable({
    data: questions,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  useEffect(() => {
    table.setPageSize(50);
  }, [table]);

  return (
    <div className="space-y-2">
      <TableToolbar
        table={table}
        questions={questions}
        subSubjects={subSubjects}
      />
      <ScrollArea className="h-[500px] rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <TableFooter subSubjects={subSubjects} table={table} />
    </div>
  );
};
