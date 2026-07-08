export function DigestHeader({ title, description }: { title: string, description: string }) {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mt-2">{description}</p>
    </header>
  );
}
