import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { mapData } from "./brainstormUtil";

export const getProjectBrainstorms = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  const brainstormCollection = collection(db, "brainstorms");
  const q = query (brainstormCollection, where("project", "==", projectRef));
  const snapshot = await getDocs(q)
  return mapData(snapshot)
}