import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/FirebaseConfig"
import { mapData } from "./featureUtil"

export const getProjectFeatures = async(projectId) => {
  const projectRef = doc(db, 'projects', projectId)
  const featureCollection = collection(db, "features")
  const q = query(featureCollection, where('project', '==', projectRef))
  const snapshot = await getDocs(q)
  return mapData(snapshot);
}