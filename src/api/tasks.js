import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const fetchTasks = async (userId) => {
  if (!userId) return [];
  const q = query(collection(db, "todos"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const fetchTask = async (taskId) => {
  const docRef = doc(db, "todos", taskId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Task not found");
  }
};

const addTask = async (taskData) => {
  await addDoc(collection(db, "todos"), taskData);
};

const editTask = async (taskId, taskData) => {
  const taskRef = doc(db, "todos", taskId);
  await updateDoc(taskRef, taskData);
};

const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "todos", taskId));
};

const toggleTaskStatus = async (taskId) => {
  const taskRef = doc(db, "todos", taskId);
  const taskSnap = await getDoc(taskRef);
  if (taskSnap.exists()) {
    await updateDoc(taskRef, {
      status: !taskSnap.data().status,
    });
  }
};

export {
  fetchTasks,
  deleteTask,
  toggleTaskStatus,
  addTask,
  editTask,
  fetchTask,
};
