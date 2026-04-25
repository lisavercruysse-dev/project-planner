import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/FirebaseConfig"
import { mapData, mapSingleData } from "./featureUtil"

export const getProjectFeatures = async(projectId) => {
  const projectRef = doc(db, 'projects', projectId)
  const featureCollection = collection(db, "features")
  const q = query(featureCollection, where('project', '==', projectRef))
  const snapshot = await getDocs(q)
  return mapData(snapshot);
}

export const getFeatureById = async(featureId) => {
  const featureRef = doc(db, "features", featureId);
  const featureSnapshot = await getDoc(featureRef);
  if (!featureSnapshot.exists()) return null;
  return mapSingleData(featureSnapshot.id, featureSnapshot.data());
}

export const createFeature = async(data) => {
  const featureCollection = collection(db, "features");

  const newFeature = {
    ...data,
    project: doc(db, "projects", data.project)
  }

  const docRef = await addDoc(featureCollection, newFeature);
  return {
    id: docRef.id,
    name: data.name,
    description: data.description,
    project: data.project
  }
}