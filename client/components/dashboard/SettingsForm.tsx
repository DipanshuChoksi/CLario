"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function SettingsForm() {
  const { data: session } = useSession();
  const [schedule, setSchedule] = useState("08:00");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSchedule() {
      try {
        const res = await fetch("/api/user/schedule");
        if (res.ok) {
          const data = await res.json();
          if (data.schedule) setSchedule(data.schedule);
        }
      } catch (error) {
        console.error("Failed to load schedule", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSchedule();
  }, []);

  async function handleSave() {
    setIsSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schedule }),
      });
      if (res.ok) {
        setMessage("Preferences saved successfully!");
      } else {
        setMessage("Failed to save preferences.");
      }
    } catch (error) {
      console.error("Failed to save", error);
      setMessage("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Digest Schedule</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Delivery Time</label>
            <input
              type="time"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              disabled={isLoading || isSaving}
              className="w-40 px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || isSaving}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </button>
          {message && (
            <p className={`text-sm mt-2 ${message.includes('Failed') || message.includes('error') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
