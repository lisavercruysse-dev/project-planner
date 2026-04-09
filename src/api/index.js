import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

  export const getTopLevelTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const q = query(tasksCollection, where('parent', '==', null));
    const snapshot = await getDocs(q);

    const tasks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        status: data.status,
        estimatedTime: data.estimatedTime || 0,
        date: data.plannedDate?.toDate?.() || new Date(),
        timeSpent: data.spentTime || 0,
        description: data.description || "",
        parent: null,
      };
    });
    return tasks;
  };

  export const hasChildren = async (taskId) => {
    const taskCollection = collection(db, "tasks");
    const q = query(taskCollection, where("parent", "==", doc(db, "tasks", taskId)), limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty; 
};

  export const getChildTasks = async (taskId) => {
    const parentRef = doc(db, 'tasks', taskId)
    const taskCollection = collection(db, 'tasks');
    const q = query(taskCollection, where('parent', '==', parentRef));
    const snapshot = await getDocs(q);

    const tasks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        status: data.status,
        estimatedTime: data.estimatedTime || 0,
        date: data.plannedDate?.toDate?.() || new Date(),
        timeSpent: data.spentTime || 0,
        description: data.description || "",
        parent: null,
        children: [],
      };
    });
    return tasks;
  }

  export const getTaskDetails = async (taskId) => {
    //task
    const taskRef = doc(db, "tasks", taskId);
    const taskData = await getLinkedData(taskRef);
    if (!taskData) return null;

    //feature
    const featureData = await getLinkedData(taskData.feature);
    if (!featureData) return null;

    //project
    const projectData = await getLinkedData(featureData.project);
    if (!projectData) return null;

    //parent
    let parentData = null;
    if (taskData.parent) {
      parentData = await getLinkedData(taskData.parent);
    }

    return {
      task: taskData,
      feature: featureData,
      project: projectData,
      parent: parentData,
    }
  }

  export const getLinkedData = async (ref) => {
    if (!ref) return null;

    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id, ...snapshot.data()
    };
  }