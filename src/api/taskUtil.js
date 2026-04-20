  import { getDoc } from "firebase/firestore";
  
  export const mapData = (snapshot) => {
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        status: data.status,
        estimatedTime: data.estimatedTime || 0,
        date: data.plannedDate?.toDate?.() || new Date(),
        spentTime: data.spentTime || 0,
        description: data.description || "",
        parent: data.parent || null, 
        feature: data.feature || null,
        children: [],     
      };
    });
  };

  export const mapSingleData = (id, data) => ({
    id,
    name: data.name,
    status: data.status,
    estimatedTime: data.estimatedTime || 0,
    date: data.plannedDate?.toDate?.() || new Date(),
    spentTime: data.spentTime || 0,
    description: data.description || "",
    parent: data.parent || null,
    feature: data.feature || null,
    children: [],
  });

  export const getLinkedData = async (ref) => {
    if (!ref) return null;

    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id, ...snapshot.data()
    };
  }