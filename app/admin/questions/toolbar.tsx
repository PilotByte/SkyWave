import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './viewOptions';
import { DataTableFacetedFilter } from './facetedFilter';
import { Button } from '@/components/ui/button';
import { CrossIcon, CrosshairIcon, Trash2Icon } from 'lucide-react';
import { Question } from '@/app/types/question';
import { SubSubject } from '@/app/types/Subject';
// import { Import } from '@/types/imports';
import { useRouter } from 'next/navigation';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  questions: PocketBaseRecord<Question>[];
  subSubjects: PocketBaseRecord<SubSubject>[];
}

export function TableToolbar<TData>({
  table,
  questions,
  subSubjects,
}: DataTableViewOptionsProps<TData>) {
  const router = useRouter();
  const lmsPools = questions.reduce<
    {
      label: string;
      value: string;
    }[]
  >((acc, question) => {
    if (!acc.find((x) => x.value === question.lmsQuestionPool)) {
      acc.push({
        label: question.lmsQuestionPool,
        value: question.lmsQuestionPool,
      });
    }
    return acc;
  }, []);

  const imports = questions
    .reduce<
      {
        label: string;
        value: string;
      }[]
    >((acc, question) => {
      const importId: string | undefined = question.expand
        ?.imports_via_questions
        ? question.expand.imports_via_questions[0].id
        : undefined;
      if (!acc.find((x) => x.value === importId)) {
        acc.push({
          label: importId || '',
          value: importId || '',
        });
      }
      return acc;
    }, [])
    .filter((x) => x.value !== '');

  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex">
      <div className="space-x-2">
        {table.getColumn('lmsQuestionPool') && (
          <DataTableFacetedFilter
            column={table.getColumn('lmsQuestionPool')}
            title="LMS Question Pool"
            options={lmsPools}
          />
        )}
        <DataTableFacetedFilter
          column={table.getColumn('sub_subjects')}
          title="Sub-Subjects"
          options={[
            {
              label: 'Empty',
              value: '',
            },
            ...subSubjects.map((s) => ({
              label: s.name,
              value: s.name,
            })),
          ]}
        />
        <DataTableFacetedFilter
          column={table.getColumn('imports')}
          title="Imports"
          options={imports}
        />
        <DataTableFacetedFilter
          column={table.getColumn('questionType')}
          title="Type"
          options={[
            {
              label: 'Number questions',
              value: 'number',
            },
            {
              label: 'Choice questions',
              value: 'choice',
            },
          ]}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              router.push('/admin/questions');
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Trash2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
