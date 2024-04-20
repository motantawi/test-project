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
  try {
    if (!userId) return [];
    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw new Error("Unable to fetch tasks due to network or server issues.");
  }
};

const fetchTask = async (taskId) => {
  try {
    const docRef = doc(db, "todos", taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    console.error("Failed to fetch task:", error);
    throw new Error("Unable to fetch task due to network or server issues.");
  }
};

const addTask = async (taskData) => {
  try {
    const { title } = taskData;
    const tasksQuery = query(
      collection(db, "todos"),
      where("title", "==", title)
    );

    const querySnapshot = await getDocs(tasksQuery);
    if (querySnapshot.empty) {
      await addDoc(collection(db, "todos"), taskData);
    } else {
      throw Error("A task with the same title already exists.");
    }
  } catch (error) {
    console.error("Failed to add task:", error);
    throw new Error("Unable to add task due to network or server issues.");
  }
};

const editTask = async (taskId, taskData) => {
  try {
    const taskRef = doc(db, "todos", taskId);
    await updateDoc(taskRef, taskData);
  } catch (error) {
    console.error("Failed to edit task:", error);
    throw new Error("Unable to edit task due to network or server issues.");
  }
};

const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "todos", taskId));
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw new Error("Unable to delete task due to network or server issues.");
  }
};

const toggleTaskStatus = async (taskId) => {
  try {
    const taskRef = doc(db, "todos", taskId);
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
      await updateDoc(taskRef, {
        status: !taskSnap.data().status,
      });
    } else {
      throw new Error("Task not found for status toggle");
    }
  } catch (error) {
    console.error("Failed to toggle task status:", error);
    throw new Error(
      "Unable to toggle task status due to network or server issues."
    );
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
