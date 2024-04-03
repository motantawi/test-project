import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const requestLogin = async ({ email, password }) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const user = userDocs.find((user) => user.password === password);
    if (user) {
      const { id, email, firstName, lastName } = user;
      return { id, email, firstName, lastName };
    } else {
      throw new Error("Password does not match.");
    }
  } else {
    throw new Error("User not found.");
  }
};

const requestCreateUser = async ({ firstName, lastName, email, password }) => {
  await addDoc(collection(db, "users"), {
    firstName,
    lastName,
    email,
    password,
  });
};

const requestUpdateUserProfile = async (
  uid,
  { firstName, lastName, email, password }
) => {
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, {
      firstName,
      lastName,
      email,
      password,
    });

    const updatedUserSnap = await getDoc(userRef);

    if (updatedUserSnap.exists()) {
      const { email, firstName, lastName } = updatedUserSnap.data();
      return { id: updatedUserSnap.id, email, firstName, lastName };
    } else {
      throw new Error("Failed to fetch updated user profile.");
    }
  } catch (error) {
    console.error("Error updating user profile in Firestore:", error);
    throw error;
  }
};

export { requestLogin, requestCreateUser, requestUpdateUserProfile };
