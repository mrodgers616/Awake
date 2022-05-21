import type { FirebaseError } from "firebase/app";
import firebaseClient, { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import * as fb from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

let app
try {
  app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  });

  const authentication = getAuth();

  setPersistence(authentication, browserSessionPersistence).then(_ => {
    console.log('Persistence set');
  });
} catch (err) {
  if(!/alreay exists/.test((err as FirebaseError).message)) {
    console.error('Firebase initialization error', (err as FirebaseError).stack);
  }
}

const db = getFirestore(app);

const onChainProposals = collection(db, "proposals");
const users = collection(db, 'users');

async function getAllProposals(): Promise<any> {
  try {
    return await getDocs(onChainProposals);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function addProposalToStore (proposal: any): Promise<DocumentReference<any> | undefined> {
  try {
    return await addDoc(onChainProposals, proposal);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function fetchProposalFromStore (id: string): Promise<DocumentSnapshot | undefined> {
  try {
    const proposalRef = doc(getFirestore(), `proposals`, id);
    return await getDoc(proposalRef);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function updateProposalInStore (storeId: string, newData: Record<string, any>) {
  try {
   const proposalRef = doc(getFirestore(), 'proposals', storeId);
   return await updateDoc(proposalRef, newData);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function getProfileData (uid: string): Promise<any> {
  try {
    console.log(uid);
    const userRef = doc(getFirestore(), 'users', uid);
    return await getDoc(userRef);
  } catch (error) {
    console.error((error as FirebaseError).message);
  }
}

async function updateOrAddProfileData (
  profileId: string, 
  newData: Record<string, any>
): Promise<any> {
  try {
    console.log(profileId);
    const userRef = doc(getFirestore(), 'users', profileId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return await updateDoc(userRef, newData);
    } else {
      return await setDoc(userRef, newData);
    }
  } catch (err) {
    console.error((err as FirebaseError).message);
  }
}

async function addImageToStorage (uid: string, file: any): Promise<any> {
  try {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `${uid}/${file.name}`);
    const id = await uploadBytes(storageRef, file);
    return id.metadata;
  } catch (error: any) {
    console.error(error.message);
  }
}

async function getImageFromStorage (imageId: string): Promise<any> {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, imageId);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    console.error(error.message);
  }
}

export { 
  updateOrAddProfileData,
  fetchProposalFromStore,
  updateProposalInStore,
  getImageFromStorage,
  addProposalToStore,
  addImageToStorage,
  onChainProposals,
  getAllProposals,
  firebaseClient,
  getProfileData
};


