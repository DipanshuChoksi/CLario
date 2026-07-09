"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, Download, ChevronRight } from "lucide-react";

const mockDigests = [
  { id: 1, date: "2026-07-09", title: "Daily Tech Insights", preview: "Updates on LLMs, React 19, and cloud architectures for scalable applications..." },
  { id: 2, date: "2026-07-08", title: "Design & Startups", preview: "Figma updates, YC founder advice, and typography trends for modern web..." },
  { id: 3, date: "2026-07-07", title: "Crypto & Finance", preview: "Market overview, new DeFi protocols, and tokenomics breakdowns..." },
  { id: 4, date: "2026-07-06", title: "AI Research", preview: "New papers on transformer optimization, embedding models, and RAG architectures..." },
];

export function DigestHistory() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {mockDigests.map((digest, i) => (
        <motion.div
          key={digest.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group relative flex flex-col justify-between p-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* Subtle gradient background effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full ring-1 ring-blue-500/20">
                <Calendar className="w-3.5 h-3.5" />
                <span>{digest.date}</span>
              </div>
              <button className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {digest.title}
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {digest.preview}
            </p>
          </div>

          <div className="relative z-10 mt-8 flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-5">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
              <span>Read Full Digest</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
