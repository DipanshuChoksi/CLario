'use client';

import { motion } from 'framer-motion';

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="h-full max-w-5xl mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
