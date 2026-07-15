"use client";

import { useDigestStore } from "@/store/digestStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function DigestViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const getDigestById = useDigestStore((state) => state.getDigestById);

  // Need to hydrate state to prevent mismatch errors during SSR
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const digest = getDigestById(id as string);

  if (!digest) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <h2 className="text-xl font-bold">Digest not found</h2>
        <p className="text-zinc-500">
          Could not find this email digest in your local history.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formattedDate =
    new Date(digest.date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) !== "Invalid Date"
      ? new Date(digest.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : digest.date;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <Link
          href="/dashboard/history"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
          {digest.subject}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{digest.from}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Markdown rendering using standard typography prose classes */}
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-headings:font-semibold">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {digest.body || "*No content available*"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
