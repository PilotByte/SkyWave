import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { SubSubject } from '@/app/types/Subject';

import { Table } from '@tanstack/react-table';
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  Loader2,
  MoveLeftIcon,
  MoveRightIcon,
} from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import { useState } from 'react';

interface TableFooterProps<TData> {
  table: Table<TData>;
  subSubjects: PocketBaseRecord<SubSubject>[];
}

export function TableFooter<TData>({
  table,
  subSubjects,
}: TableFooterProps<TData>) {
  const [selectedSubSubject, setSelectedSubSubject] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const assignQuestions = async () => {
    setLoading(true);
    try {
      const selectedRowIds = table
        .getFilteredSelectedRowModel()
        .rows.map((r) => (r.original as any).id);
      const subSubjectId = selectedSubSubject;
      if (!subSubjectId) return;

      const res = await fetch('/api/questions/sort', {
        method: 'POST',
        body: JSON.stringify({ questionIds: selectedRowIds, subSubjectId }),
      });

      const data = await res.json();
      toast({
        description: `assigned ${data.questionCount} questions to ${data.subSubject.name}`,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred while assigning questions',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="inline-flex space-x-4">
        <Select
          onValueChange={(v) => setSelectedSubSubject(v)}
          value={selectedSubSubject}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subSubjects.map((subSubject) => (
              <SelectItem key={subSubject.id} value={subSubject.id}>
                {subSubject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          disabled={loading || !selectedSubSubject}
          onClick={assignQuestions}
        >
          {loading && (
            <>
              <Loader2 className="animate-spin mr-3" /> Loading{' '}
            </>
          )}
          {!loading && 'Import'}
        </Button>
      </div>
      <div className="flex flex-row">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ArrowLeftToLineIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <MoveLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <MoveRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ArrowRightToLineIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
