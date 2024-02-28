import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from 'bcrypt';

const firestoreApp = getFirestore(app);

export const retriveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestoreApp, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const retriveDataById = async (collectionName: string, id: string) => {
  const snapshotById = await getDoc(doc(firestoreApp, collectionName, id));
  const data = snapshotById.data();
  return data;
};

export const signUp = async (
  userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  },
  callback: Function
) => {
  // check exist user
  const querySnapshot = query(
    collection(firestoreApp, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(querySnapshot);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (data.length > 0) {
    return callback(false);
  } else {
    if(!userData.role) userData.role = "user";
    userData.password = await bcrypt.hash(userData.password, 10);


    await addDoc(collection(firestoreApp, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch((err) => {
        callback(false);
        console.log(err);
      });
  }
};
