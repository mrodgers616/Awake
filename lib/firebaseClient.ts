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
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
  FieldValue
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

  setPersistence(authentication, browserSessionPersistence);
} catch (err) {
  if(!/alreay exists/.test((err as FirebaseError).message)) {
    console.error('Firebase initialization error', (err as FirebaseError).stack);
  }
}

const db = getFirestore(app);

const onChainProposals = collection(db, "proposals");
const users = collection(db, 'users');
const newsletter = collection(db, 'newsletter');

async function getAllProposals(): Promise<any> {
  try {
    return await getDocs(onChainProposals);
  } catch (error: any) {
    return error;
  }
}

async function addProposalToStore (proposal: any): Promise<DocumentReference<any> | undefined> {
  try {
    return await addDoc(onChainProposals, proposal);
  } catch (error: any) {
    console.error(error.message);
  }
}

async function addNewsletterSubscriberToStore (email: any): Promise<DocumentReference<any> | undefined> {
  try {
    return await addDoc(newsletter, email);
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

async function fetchFeaturedProposalFromStore (): Promise<DocumentSnapshot | undefined> {
  try {
    const q = query(collection(db, "proposals"), where("featured", "==", true));
    let proposals: any = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      proposals.push(doc.data())
    });
    return proposals;
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
    //console.log(uid);
    const userRef = doc(getFirestore(), 'users', uid);
    return await getDoc(userRef);
  } catch (error) {
    console.error((error as FirebaseError).message);
  }
}

async function getAllDocs (collectionToGet: string): Promise<any> {
  try {
    let arrayOfDocs: any = [];
    const querySnapshot = await getDocs(collection(db, collectionToGet));
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      let formatDocData = {
        name: docData.username,
        id: doc.id,
      }
      arrayOfDocs.push(formatDocData);
    });
    return arrayOfDocs;
  } catch (error) {
    console.error((error as FirebaseError).message);
  }
}

async function updateOrAddProfileData (
  profileId: string, 
  newData: Record<string, any>
): Promise<any> {
  try {
    //console.log(profileId);
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

const addComment = async (comment: any, user: any, userId: any) => {
  const batch = writeBatch(db);

  if (comment.parentId) {
      const parentCommentRef = doc(db, 'comments3', comment.parentId);

      let childCounter = await getDoc(parentCommentRef)
      let childData = childCounter.data()

      batch.set(parentCommentRef, 
          { childCount: childData ? childData.childCount + 1 : 1 }, 
          { merge: true });
  }
  const newCommentRef = doc(collection(db, 'comments3'))

  user = await getProfileData(userId);
  if(user) {
    user = user.data();
  }

  batch.set(newCommentRef, {
      content: comment.content,
      createdAt: serverTimestamp(),
      updatedAt: null,
      moderated: false,
      parentId: comment.parentId,
      postId: comment.postId,
      postType: comment.postType,
      user: {
          uid: userId,
          displayName: user.username,
          profileImage: user.profileImage ?  user.profileImage : null,
      }
  });

  batch.commit();

  const docReturn = getDoc(newCommentRef);
  return await docReturn;
};

const getComments = async (parentId: any, slug: any, type: any, limit: any) => {
  let commentsQuery = query(collection(db, 'comments3'),
                          where('postType', '==', type),
                          where('postId', '==', slug),
                          where('parentId', '==', parentId || null),
                          orderBy("createdAt"));

  // if (limit) {
  //     commentsQuery = commentsQuery.limit(limit);
  // }

  let querySnapshot = getDocs(commentsQuery);

  return querySnapshot;
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
  getProfileData,
  fetchFeaturedProposalFromStore,
  addComment,
  getComments,
  getAllDocs,
  addNewsletterSubscriberToStore
};


