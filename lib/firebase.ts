import { FirebaseError, initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage";

let app
try {
  app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
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

async function getProfileData (userId: string): Promise<any> {
  try {
    const userRef = doc(getFirestore(), 'users', userId);
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
    const userRef = doc(getFirestore(), 'users', profileId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return await updateDoc(userRef, newData);
    } else {
      return await addDoc(users, newData);
    }
  } catch (err) {
    console.error((err as FirebaseError).message);
  }
}

async function addImageToStorage (file: any): Promise<any> {
  try {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    const id = await uploadBytes(storageRef, file);
    return id.metadata;
  } catch (error: any) {
    console.error(error.message);
  }
}

type Firebase = {
  app: typeof app;
  onChainProposals: typeof onChainProposals;
  getAllProposals: () => Promise<any>;
  addProposalToStore: (proposal: any) => Promise<DocumentReference<any> | undefined>;
  updateProposalInStore: (storeId: string, newData: Record<string, any>) => Promise<any>;
  fetchProposalFromStore: (proposalId: string) => Promise<DocumentSnapshot | undefined>;
  addImageToStorage: (file: any) => Promise<any>;
  getProfileData: (userId: string) => Promise<any>;
  updateOrAddProfileData: (profileId: string, newData: Record<string, any>) => Promise<any>;
}

const firebase: Firebase = {
  app,
  onChainProposals,
  getAllProposals,
  addProposalToStore,
  updateProposalInStore,
  fetchProposalFromStore,
  updateOrAddProfileData,
  addImageToStorage,
  getProfileData
};

export default firebase;


