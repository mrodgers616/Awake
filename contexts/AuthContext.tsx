import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

type State = {
  loggedIn: boolean;
  loggingIn: boolean;
  authErrors?: any;
  userid?: string | null;
  user?: UserRecord | null;
  user2?: UserCredential | null;
};

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
    userid: '123',
    user: null,
    user2: null,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<State>(getInitialState());

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (window.sessionStorage) {
      const token = sessionStorage.getItem("Auth Token");
      setState({ ...state, loggedIn: token ? true : false });
    }
  }, []);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const authentication = getAuth();
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      setState({ ...state, loggedIn: true });

      if (window.sessionStorage) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.sessionStorage.setItem("Auth Token", response.user.refreshToken);

        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as FirebaseError).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function logout(): Promise<void> {
    if (window.sessionStorage) {
      sessionStorage.removeItem("Auth Token");
      setState({ ...state, user: undefined, loggedIn: false });
      router.push("/");
    }
  }

  async function register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const authentication = getAuth();
      const response = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (window.sessionStorage) {
        toast({
          title: "Registration Successful",
          description:
            "You have successfully registered. Please login to continue.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.sessionStorage.setItem("Auth Token", response.user.refreshToken);
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as FirebaseError).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const value: ContextValue = {
    login,
    logout,
    register,
    ...state,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
