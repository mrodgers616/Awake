import type { ReactNode } from 'react';
import type { QuerySnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseContext = createContext<ContextValue | undefined>(undefined);

type State = {
  app: any | null;
  proposals: QuerySnapshot | null;
}

interface ContextValue extends State {
  name?: string | null;
  getAllProposals?: () => Promise<void>;
  addProposalToStore?: (proposalId: string) => Promise<void>;
}

function initialState(): State {
  return {
    app: null,
    proposals: null,
  }
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [ state, setState ] = useState<State>(initialState());

  useEffect(() => {
    initApp();
    getAllProposals();
  }, []);

  function initApp(): void {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    setState({ ...state, app });
  }

  async function getAllProposals(): Promise<void> {
    try {
      const proposalsCollection = collection(getFirestore(), 'proposals');
      const proposals = await getDocs(proposalsCollection);
      setState({ ...state, proposals });
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function addProposalToStore(proposalId: any): Promise<void> {
    try {
      const proposalCollection = collection(getFirestore(), 'proposals');
      const proposal = await addDoc(proposalCollection, proposalId);
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const value: ContextValue = {
    getAllProposals,
    addProposalToStore,
    ...state
  }

  return (<FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>)
}


export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
