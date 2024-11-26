import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';
import { filter } from './filter';
import { FormSchema } from './page';
import { z } from 'zod';

export const Filters = ({
  formControl,
}: {
  formControl: Control<z.infer<typeof FormSchema>>;
}) => {
  return (
    <FormField
      control={formControl}
      name="filter"
      render={() => {
        return (
          <FormItem className="rounded-md border p-4 shadow">
            <FormLabel>Filter</FormLabel>
            {filter.map((f) => (
              <FormField
                name="filter"
                key={f.value}
                control={formControl}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          className='mt-2'
                          checked={field.value.includes(f.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, f.value])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== f.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{f.name}</FormLabel>
                        <FormDescription>{f.description}</FormDescription>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </FormItem>
        );
      }}
    />
  );
};
