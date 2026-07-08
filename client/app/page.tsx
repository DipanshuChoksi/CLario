'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl text-black dark:text-zinc-50">Clario</h1>
      <p className="text-lg text-black dark:text-zinc-50">
        Transform newsletter overload into a clean, actionable intelligence feed
        for developers, founders, and technical learners.
      </p>

      <div className="mt-8">
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-zinc-600 dark:text-zinc-300">Signed in as {session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
