import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './components/AdminSideNav';

const sidebarNavItems = [
  {
    href: '/admin/questions',
    title: 'Questions',
  },
  {
    href: '/admin/users',
    title: 'Manage users',
  },
  {
    href: '/admin/import',
    title: 'Import from PDF',
  },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">
          Manage the question database / Fetch questions from the PDFs
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
