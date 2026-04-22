import { addDoc, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { getFeatureById, getProjectFeatures } from "./features";
import { getProjectById } from "./projects";
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

  export const getTaskById = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnapshot = await getDoc(taskRef);
    if (!taskSnapshot.exists()) return null;
    return mapSingleData(taskSnapshot.id, taskSnapshot.data());  
  }

  export const getTaskDetails = async (taskId) => {
    const taskData = await getTaskById(taskId);
    if (!taskData) return null;

    let featureData = null;
    let projectData = null;
    let parentData = null;

    const featureId = taskData.feature?.id ?? null;
    const parentId = taskData.parent?.id ?? null;

    if (featureId !== null) {
      featureData = await getFeatureById(featureId);
      const projectId = featureData?.project?.id ?? null;
      if (projectId !== null) {
        projectData = await getProjectById(projectId);
      }
    }

    if (featureData === null && parentId !== null) {
      parentData = await getTaskById(parentId);
      const parentDetails = await getTaskDetails(parentId);
      featureData = parentDetails?.feature ?? null;
      projectData = parentDetails?.project ?? null;
    }

    return { task: taskData, feature: featureData, project: projectData, parent: parentData };
  };

export const getFeatureTasks = async (featureId) => {
  const featureRef = doc(db, "features", featureId)
  const taskCollection = collection(db, "tasks")
  const q = query (taskCollection, where('feature', '==', featureRef))
  const snapshot = await getDocs(q)
  return mapData(snapshot)
}

export const getProjectTasks = async (projectId) => {
  const features = await getProjectFeatures(projectId);

  const tasks = await Promise.all(
    features.map((f) => getFeatureTasks(f.id))
  );

}

  //writing
  export async function updateTask(taskId, data) {
    const ref = doc(db, "tasks", taskId);
    await updateDoc(ref, data);
  }

export async function createTask(data) {
  const taskCollection = collection(db, "tasks");

  let plannedDate = data.plannedDate ?? null;

  if (!plannedDate && data.parent) {
    const parentSnap = await getDoc(doc(db, "tasks", data.parent));
    if (parentSnap.exists()) {
      const raw = parentSnap.data().plannedDate?.toDate?.() ?? null;
      if (raw) raw.setHours(0, 0, 0, 0);
      plannedDate = raw;
    }
  }

  const newTask = {
    ...data,
    plannedDate,
    parent: data.parent ? doc(db, "tasks", data.parent) : null,
    feature: data.feature ? doc(db, "features", data.feature) : null,
  }

  const docRef = await addDoc(taskCollection, newTask);
  return {
    id: docRef.id,
    ...data,
    plannedDate,  
    parent: data.parent ? { id: data.parent } : null,
    feature: data.feature ? { id: data.feature } : null,
  };
}