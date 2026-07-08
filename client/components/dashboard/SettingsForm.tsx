export function SettingsForm() {
  return (
    <div className="mt-8 max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Digest Schedule</h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Delivery Time</label>
          <input type="time" defaultValue="08:00" className="w-40 px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
