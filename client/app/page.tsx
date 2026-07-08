'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl text-black dark:text-zinc-50 font-bold">Clario</h1>
      <p className="text-lg text-black dark:text-zinc-50 mt-4 max-w-lg text-center">
        Transform newsletter overload into a clean, actionable intelligence feed
        for developers, founders, and technical learners.
      </p>

      <div className="mt-10 h-12 flex items-center justify-center">
        {status === 'loading' || session ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
