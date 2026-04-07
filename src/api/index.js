import { collection, getDocs } from "firebase/firestore";
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
    };
  });
};