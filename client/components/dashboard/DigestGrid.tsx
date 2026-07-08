export function DigestGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="animate-pulse flex flex-col gap-3 h-full">
            <div className="w-1/2 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2" />
            <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="w-5/6 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="w-4/6 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="w-1/3 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-md mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
