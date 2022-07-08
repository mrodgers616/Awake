import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onIdTokenChanged,
  onAuthStateChanged,
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
        ////console.log('onIdTokenChanged', user);
          if (!user) {
            setState({ ...state, user: null, userid: null })
            nookies.set(undefined, 'token', '', { path: '/'});
          } else {
            const token = await user.getIdToken();
            setState({ ...state, user: user, userid: user.uid });
            nookies.set(undefined, '_session', token, { path: '/'});
            nookies.set(undefined, 'session', token, { path: '/'});
            nookies.set(undefined, '__session', token, { path: '/'});
            nookies.set(null, "userUID", user.uid, {path: '/', maxAge: 60*60*24*14});
          }
    })
  }, []);

  useEffect(() => {
    const authentication = getAuth();
    return onAuthStateChanged(
      authentication, async (user: User | null) => {
        //console.log('onAuthStateChanged', user);
    })
  }, [])

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
      setState({ ...state, loggedIn: true, user: response.user, userid: response.user.uid });
      toast({
          title: "Welcome Back!",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Login Failed.",
        description: "email or password is incorrect.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  }

  async function logout(): Promise<void> {
    await getAuth().signOut();
    setState({ ...state, user: null, loggedIn: false, userid: null });
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
            "Welcome!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
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
