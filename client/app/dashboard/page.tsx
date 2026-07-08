import { DigestHeader } from '@/components/dashboard/DigestHeader';
import { DigestGrid } from '@/components/dashboard/DigestGrid';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DigestHeader
        title="Today's Digest"
        description="Your personalized intelligence feed for today."
      />
      <DigestGrid />
    </div>
  );
}
