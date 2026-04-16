import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { mapData, mapSingleData } from "./taskUtil";

//fetching
export const hasChildren = async (taskId) => {
    const taskCollection = collection(db, "tasks");
    const q = query(taskCollection, where("parent", "==", doc(db, "tasks", taskId)), limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty; 
  };

  export const getTodaysTasks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)

    const taskCollection = collection(db, "tasks");
    const q = query(
      taskCollection,
      where("plannedDate", ">=", today),
      where("plannedDate", "<", tomorrow)
    )

    const snapshot = await getDocs(q)
    const tasks = mapData(snapshot);
    return tasks;
  };

  export const getChildTasks = async (taskId) => {
    const parentRef = doc(db, 'tasks', taskId)
    const taskCollection = collection(db, 'tasks');
    const q = query(taskCollection, where('parent', '==', parentRef));
    const snapshot = await getDocs(q);

    const tasks = mapData(snapshot);
    return tasks;
  }

export const getTaskDetails = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  const taskSnapshot = await getDoc(taskRef);
  if (!taskSnapshot.exists()) return null;
  const taskData = mapSingleData(taskSnapshot.id, taskSnapshot.data());

  const featureSnapshot = await getDoc(taskSnapshot.data().feature);
  if (!featureSnapshot.exists()) return null;
  const featureData = mapSingleData(featureSnapshot.id, featureSnapshot.data());

  const projectSnapshot = await getDoc(featureSnapshot.data().project);
  if (!projectSnapshot.exists()) return null;
  const projectData = mapSingleData(projectSnapshot.id, projectSnapshot.data());

  let parentData = null;
  if (taskSnapshot.data().parent) {
    const parentSnapshot = await getDoc(taskSnapshot.data().parent);
    if (parentSnapshot.exists()) {
      parentData = mapSingleData(parentSnapshot.id, parentSnapshot.data());
    }
  }

  return { task: taskData, feature: featureData, project: projectData, parent: parentData };
};

  //writing
  export async function updateTask(taskId, data) {
    const ref = doc(db, "tasks", taskId);
    await updateDoc(ref, data);
  }