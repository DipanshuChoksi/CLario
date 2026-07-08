'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: 'Today', href: '/dashboard', icon: LayoutDashboard },
    { name: 'History', href: '/dashboard/history', icon: History },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl flex flex-col justify-between"
    >
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Clario</span>
        </Link>

        <nav className="flex flex-col gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-medium shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200'
                )}
              >
                <item.icon className={clsx('w-5 h-5 transition-transform duration-200 group-hover:scale-110', isActive && 'text-blue-600 dark:text-blue-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-6 px-2">
          {session?.user?.image ? (
            <img src={session.user.image} alt="Avatar" className="w-10 h-10 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700" />
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{session?.user?.name || 'User'}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{session?.user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </motion.aside>
  );
}
