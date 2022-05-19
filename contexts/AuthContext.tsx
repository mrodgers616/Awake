import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onIdTokenChanged,
  NextFn,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { updateOrAddProfileData } from "../lib/firebaseClient";
import nookies from 'nookies';
import type { User } from 'firebase/auth';

type State = {
  loggedIn: boolean;
  loggingIn: boolean;
  authErrors?: any;
  userid?: string | null;
  user?: User | null;
};

interface ContextValue extends State {
  login: (data: LoginAndRegisterProps) => Promise<void>;
  register: (data: LoginAndRegisterProps) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginAndRegisterProps {
  username: string;
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
    user: null,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<State>(getInitialState());

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const authentication = getAuth();
    return onIdTokenChanged(
      authentication, async (user: User | null) => {
          if (!user) {
            setState({ ...state, loggedIn: false, user: null });
            nookies.set(undefined, 'token', '', { path: '/'});
          } else {
            const token = await user.getIdToken();
            setState({ ...state, loggedIn: true, user: user });
            nookies.set(undefined, 'token', token, { path: '/'});
          }
    })
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = await getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
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
      toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
      });
      router.push("/");
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
    await getAuth().signOut();
    setState({ ...state, user: undefined, loggedIn: false });
    router.push("/");
  }

  async function register({
    username,
    email,
    password,
  }: {
    username: string;
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

      console.log(response);

      // construct new user profile obj.
      const newUser = {
        backgroundImage: "",
        profileImage: "",
        biography: "",
        username,
        email,
        facebook: "",
        linkedIn: "",
        twitter: "",
        name: "",
      }

      await updateOrAddProfileData(response.user.uid, newUser);

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
