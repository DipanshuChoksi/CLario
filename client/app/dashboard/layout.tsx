import { Sidebar } from '@/components/dashboard/Sidebar';
import { MainContent } from '@/components/dashboard/MainContent';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden">
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
}
