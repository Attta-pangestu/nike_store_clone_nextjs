import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./init";

const firestoreApp = getFirestore(app);

export const retriveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestoreApp, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(data);
  return data;
};

export const retriveDataById = async (collectionName: string, id: string) => {
  const snapshotById = await getDoc(doc(firestoreApp, collectionName, id));
  const data = snapshotById.data();
  return data;
};

export const retriveDataByField = async (
  collectionName: string,
  field: string,
  value: string
) => {
  const q = query(
    collection(firestoreApp, collectionName),
    where(field, "==", value)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const addData = async (
  collectionName: string,
  data: any,
  callback: Function
) => {
  await addDoc(collection(firestoreApp, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
};

export const updateData = async (
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) => {
  const docRef = await doc(firestoreApp, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
};

export const userExisted = async (email: string) => {
  const existedUser = await retriveDataByField("users", "email", email);
  return existedUser;
};
