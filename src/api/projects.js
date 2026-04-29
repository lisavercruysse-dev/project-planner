import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { mapData, mapSingleData } from "./projectUtil";

export const getAllProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return mapData(snapshot);
}

export const getProjectById = async (id) => {
  const projectRef = doc(db, "projects", id);
  const snapshot = await getDoc(projectRef);
  if (!snapshot.exists()) return null;
  return mapSingleData(snapshot.id, snapshot.data())
}

export const createProject = async(data) => {
  const projectCollection = collection(db, "projects");

  const newProject = {
    ...data,
    name: data.name === '' ? 'untitled' : data.name,
    status: "incomplete",
    type: data.type === "software dev" ? "softwareDev" : "gameDev"
  }

  const docRef = await addDoc(projectCollection, newProject);
  return {
    id: docRef.id,
    ...newProject,
  }
}