"use client";

import { motion } from "framer-motion";
import { Calendar, Download, ChevronRight, Loader2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { API_URLS } from "@/const/urls";
import { useDigestStore, EmailDigest } from "@/store/digestStore";
import { useEffect } from "react";
import Link from "next/link";

export function DigestHistory() {
  const { data: session } = useSession();
  const setDigests = useDigestStore((state) => state.setDigests);

  const { data, loading, error } = useFetch<{ emails: EmailDigest[] }>(
    session?.user?.id ? API_URLS.GMAIL_FETCH(session.user.id) : null
  );

  const digests = data?.emails || [];

  useEffect(() => {
    if (digests.length > 0) {
      setDigests(digests);
    }
  }, [digests, setDigests]);

  if (loading) {
    return (
      <div className="mt-8 flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="mt-8 text-red-500 text-center">{error}</div>;
  }

  if (!digests.length) {
    return <div className="mt-8 text-zinc-500 text-center">No recent newsletters found.</div>;
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {digests.map((digest, i) => (
        <Link key={digest.id} href={`/dashboard/history/${digest.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="group relative flex flex-col justify-between p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-500 overflow-hidden cursor-pointer h-full"
          >
            {/* Subtle gradient background effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full ring-1 ring-blue-500/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[150px]" title={digest.date}>
                    {new Date(digest.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) !== 'Invalid Date'
                      ? new Date(digest.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                      : digest.date.split(' ').slice(0, 4).join(' ')}
                  </span>
                </div>
                <button className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {digest.subject}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {digest.snippet}
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-5">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">
                <span className="truncate max-w-[150px]" title={digest.from}>{digest.from.split('<')[0].trim() || 'Sender'}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
