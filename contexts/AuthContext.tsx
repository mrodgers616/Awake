import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth';

type State = {
  loggedIn: boolean;
  loggingIn: boolean;
  authErrors?: any;
  user?: UserRecord;
  user2?: UserCredential;
}

interface ContextValue extends State {
  login: (data: LoginAndRegisterProps) => Promise<void>;
  register: (data: LoginAndRegisterProps) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginAndRegisterProps {
  email: string;
  password: string;
}

const AuthContext = React.createContext<ContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function getInitialState(): State {
  return {
    loggedIn: false,
    loggingIn: false,
    authErrors: null,
  };
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ state, setState ] = useState<State>(getInitialState());

    const router = useRouter();

    async function login({ email, password}: {
      email: string;
      password: string;
    }): Promise<void> {
      const authentication = getAuth();
      const response = await signInWithEmailAndPassword(authentication, email, password);
    }

    async function logout(): Promise<void> {
      if(window.sessionStorage) {
        sessionStorage.removeItem("Auth Token");
        setState({ ...state, user: undefined });
        router.push('/');
      }
    }

    async function register({ email, password}: {
      email: string;
      password: string;
    }): Promise<void> {
      const authentication = getAuth();
      const response = await createUserWithEmailAndPassword(authentication, email, password);
      console.log(response);
    }

    return (
      <AuthContext.Provider value={{
        user: state.user,
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn,
        login,
        logout,
        register
      }}>
        {children}
      </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };