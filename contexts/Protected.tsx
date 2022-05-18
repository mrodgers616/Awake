import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

interface Props {
  children: JSX.Element;
}

export const Protected = ({ children }: Props) => {
  const router = useRouter();
  const { loggingIn, loggedIn } = useAuth();

  if (loggingIn) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    router.push('/login');
  }

  return children
};