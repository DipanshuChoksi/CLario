import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EmailDigest {
  id: string;
  date: string;
  subject: string;
  snippet: string;
  from: string;
  body?: string;
}

interface DigestStore {
  digests: EmailDigest[];
  setDigests: (digests: EmailDigest[]) => void;
  getDigestById: (id: string) => EmailDigest | undefined;
}

export const useDigestStore = create<DigestStore>()(
  persist(
    (set, get) => ({
      digests: [],
      setDigests: (digests) => set({ digests }),
      getDigestById: (id) => get().digests.find(d => d.id === id),
    }),
    {
      name: 'digest-storage', // saves to localStorage
    }
  )
);
