import { DigestHeader } from '@/components/dashboard/DigestHeader';

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <DigestHeader
        title="Digest History"
        description="Review your past newsletter digests."
      />

      <div className="mt-8 flex items-center justify-center h-64 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
        <p className="text-zinc-500 font-medium">No past digests found.</p>
      </div>
    </div>
  );
}
