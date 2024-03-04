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
import bcrypt from "bcrypt";

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
  if ((await userExisted(userData.email)).length > 0) callback(false);
  else {
    if (!userData.role) userData.role = "user";
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

export const signIn = async (email: string) => {
  const existedUser = await userExisted(email);
  if (existedUser.length === 0) return null;
  const user = existedUser[0];
  return user;
};

export const userExisted = async (email: string) => {
  const querySnapshot = query(
    collection(firestoreApp, "users"),
    where("email", "==", email)
  );
  const snapshot = await getDocs(querySnapshot);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const loginWithGoogle = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  image: string;
}) => {
  // TODO: Implement login with google
  const existedUser = await userExisted(userData.email);
  if (existedUser.length > 0) return existedUser[0];
  else {
    // create new user
    userData.name = userData.email.split("@")[0];
    userData.role = "user";
    userData.image = `https://avatar.iran.liara.run/public/${
      Math.floor(Math.random() * 100) + 1
    }`;
    userData.password = await bcrypt.hash(userData.password, 10);

    console.log(userData);

    try {
      await addDoc(collection(firestoreApp, "users"), userData);
      return userData;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
