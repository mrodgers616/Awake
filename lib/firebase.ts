import { initializeApp } from "firebase/app";
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

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);

const onChainProposals = collection(db, "proposals");

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
    const ref = doc(getFirestore(), `proposals`, id);
    return await getDoc(ref);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function updateProposalInStore (storeId: string, newData: Record<string, any>) {
  try {
   const ref = doc(getFirestore(), 'proposals', storeId);
   return await updateDoc(ref, newData);
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
}

const firebase: Firebase = {
  app,
  onChainProposals,
  getAllProposals,
  addProposalToStore,
  updateProposalInStore,
  fetchProposalFromStore 
};

export default firebase;


