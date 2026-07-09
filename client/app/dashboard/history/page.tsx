import { DigestHeader } from '@/components/dashboard/DigestHeader';
import { DigestHistory } from '@/components/dashboard/DigestHistory';

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <DigestHeader
        title="Digest History"
        description="Review your past newsletter digests."
      />
      <DigestHistory />
    </div>
  );
}
