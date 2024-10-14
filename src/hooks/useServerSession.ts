import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { user_return } from '@/types';

const useServerSession = () => {
  const [session, setSession] = useState<{ name?: string | null; email?: string | null; image?: string | null } & user_return | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData?.user as any); // Asumimos que la estructura de `user` está bien definida
    };

    fetchSession();
  }, []);

  return session;
};

export default useServerSession;
