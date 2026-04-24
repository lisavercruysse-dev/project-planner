import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { mapData, mapSingleData } from "./brainstormUtil";


export const getProjectBrainstorms = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  const brainstormCollection = collection(db, "brainstorms");
  const q = query (brainstormCollection, where("project", "==", projectRef));
  const snapshot = await getDocs(q)
  return mapData(snapshot)
}

export const getBrainstormById = async(id) => {
  const brainstormRef = doc(db, "brainstorms", id);
  const brainstormSnapshot = await getDoc(brainstormRef)
  if (!brainstormSnapshot.exists()) return null;
  return mapSingleData(brainstormSnapshot.id, brainstormSnapshot.data())
}

export const createBrainstorm = async(data) => {
  const brainstormCollection = collection(db, "brainstorms");

  const newBrainstorm = {
    ...data,
    project: doc(db, "projects", data.project)
  }

  const docRef = await addDoc(brainstormCollection, newBrainstorm);
  return {
    id: docRef.id,
    ...data,
    project: data.project,
  }
}

export const updateBrainstorm = async(id, data) => {
  const ref = doc(db, "brainstorms", id);
  await updateDoc(ref, data);
}