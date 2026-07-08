import { DigestHeader } from '@/components/dashboard/DigestHeader';
import { SettingsForm } from '@/components/dashboard/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DigestHeader
        title="Settings"
        description="Configure your schedule and integrations."
      />
      <SettingsForm />
    </div>
  );
}
