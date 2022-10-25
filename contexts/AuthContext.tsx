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
import { getProfileData, updateOrAddProfileData } from "../lib/firebaseClient";
import nookies from 'nookies';
import { User, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import ProfileEditForm from "../components/profile/ProfileEditForm";

type State = {
  loggedIn: boolean;
  loggingIn: boolean;
  authErrors?: any;
  userid?: string | null;
  user?: User | null;
};

//Need to add slug of first campaign here
const slug = "81jDobBiu6t4OlCZljQh"

interface ContextValue extends State {
  login: (data: LoginAndRegisterProps) => Promise<void>;
  register: (data: LoginAndRegisterProps) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  facebookSignIn: () => Promise<void>;
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
  const provider = new GoogleAuthProvider();
  //provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  const facebookProvider = new FacebookAuthProvider();

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
            nookies.set(undefined, '_session', token, { path: '/', maxAge: 60*60*24*30});
            nookies.set(undefined, 'session', token, { path: '/', maxAge: 60*60*24*30});
            nookies.set(undefined, '__session', token, { path: '/', maxAge: 60*60*24*30});
            nookies.set(null, "userUID", user.uid, {path: '/', maxAge: 60*60*24*30});
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
      const pData = await getProfileData(response.user.uid);
      const profileData = pData.data();

      let logins; 
      if(profileData.loginCounter) {
        logins = profileData.loginCounter + 1;
      }
      else {
        logins = 1;
      }
      updateOrAddProfileData(response.user.uid, { loginCounter: logins });
      const campaignID = localStorage.getItem('campaignID');
      if(campaignID) {
        router.push(`${campaignID}`);
        localStorage.removeItem('campaignID');
      }
      else {
        router.push(`/campaigns/${slug}`)
      }
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
    nookies.destroy(undefined, 'token', { path: '/', maxAge: 60*60*24*30});
    nookies.destroy(undefined, '_session', { path: '/', maxAge: 60*60*24*30});
    nookies.destroy(undefined, 'session', { path: '/', maxAge: 60*60*24*30});
    nookies.destroy(undefined, '__session', { path: '/', maxAge: 60*60*24*30});
    nookies.destroy(null, "userUID", {path: '/', maxAge: 60*60*24*30});
    router.push("/");
  }

  async function googleSignIn(): Promise<void> {
    const authentication = getAuth();
    signInWithPopup(authentication, provider)
  .then(async (result) => {

    try {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      const profile = await getProfileData(user.uid);
      const profileData = profile.data();

      if(profileData) {
        let logins; 
        if(profileData.loginCounter) {
          logins = profileData.loginCounter + 1;
        }
        else {
          logins = 1;
        }
        updateOrAddProfileData(user.uid, { loginCounter: logins });

        setState({ ...state, loggedIn: true, user: user, userid: user.uid });

        const campaignID = localStorage.getItem('campaignID');
        if(campaignID) {
          router.push(`${campaignID}`);
          localStorage.removeItem('campaignID');
        }
        else {
          router.push(`/campaigns/${slug}`)
        }
      }

      else {
        const newUser = {
          backgroundImage: "",
          profileImage: "",
          biography: "",
          username: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
          facebook: "",
          linkedIn: "",
          twitter: "",
          name: "",
          loginCounter: 1,
        }
  
        await updateOrAddProfileData(user.uid, newUser);

        setState({ ...state, loggedIn: true, user: user, userid: user.uid });
      
        console.log(user);
        if (window.sessionStorage) {
          toast({
            title: "Registration Successful",
            description:
              "Welcome!",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          let routerPushAfterRegister = "user/" + user.uid + "/edit";
          router.push(`/campaigns/${slug}`);
        }
      }
      
      
    } catch (error) {
      toast({
        title: "Error",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  async function facebookSignIn(): Promise<void> {
    const authentication = getAuth();
    signInWithPopup(authentication, facebookProvider)
  .then(async (result) => {

    try {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      console.log("hello");
      const user = result.user;
      console.log(user);

      const profile = await getProfileData(user.uid);
      const profileData = profile.data();

      if(profileData) {
        let logins; 
        if(profileData.loginCounter) {
          logins = profileData.loginCounter + 1;
        }
        else {
          logins = 1;
        }
        updateOrAddProfileData(user.uid, { loginCounter: logins });

        setState({ ...state, loggedIn: true, user: user, userid: user.uid });

        const campaignID = localStorage.getItem('campaignID');
        if(campaignID) {
          router.push(`${campaignID}`);
          localStorage.removeItem('campaignID');
        }
        else {
          router.push("/campaigns");
        }
      }

      else {
        const newUser = {
          backgroundImage: "",
          profileImage: "",
          biography: "",
          username: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
          facebook: "",
          linkedIn: "",
          twitter: "",
          name: "",
          loginCounter: 1,
        }
  
        await updateOrAddProfileData(user.uid, newUser);

        setState({ ...state, loggedIn: true, user: user, userid: user.uid });
      
        console.log(user);
        if (window.sessionStorage) {
          toast({
            title: "Registration Successful",
            description:
              "Welcome!",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          let routerPushAfterRegister = "user/" + user.uid + "/edit";
          router.push(routerPushAfterRegister);
        }
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
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });
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
        loginCounter: 1,
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
        let routerPushAfterRegister = "user/" + response.user.uid + "/edit";
        router.push(`/campaigns/${slug}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem with registration, try again.",
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
    googleSignIn,
    facebookSignIn,
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
