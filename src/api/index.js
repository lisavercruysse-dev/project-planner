import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const getAllTasks = async () => {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(`${doc.id} => ${JSON.stringify(data)}`); 
    return {
      id: doc.id,
      name: data.name ?? "",
      status: data.status ?? "planned",
      estimatedTime: data.estimatedTime ?? 0,
      date: data.plannedDate?.toDate?.() ?? new Date(),
      timeSpent: data.spentTime ?? 0,
      description: data.description ?? null,
    };
  });
};

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