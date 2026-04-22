    export const mapData = (snapshot) => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    const rawDate = data.plannedDate?.toDate?.() ?? null;
    if (rawDate) rawDate.setHours(0, 0, 0, 0);
    return {
      id: doc.id,
      name: data.name,
      status: data.status,
      estimatedTime: data.estimatedTime || 0,
      plannedDate: rawDate,
      spentTime: data.spentTime || 0,
      description: data.description || "",
      parent: data.parent || null,
      feature: data.feature || null,
    };
  });
};

export const mapSingleData = (id, data) => {
  const rawDate = data.plannedDate?.toDate?.() ?? null;
  if (rawDate) rawDate.setHours(0, 0, 0, 0);
  return {
    id,
    name: data.name,
    status: data.status,
    estimatedTime: data.estimatedTime || 0,
    plannedDate: rawDate,
    spentTime: data.spentTime || 0,
    description: data.description || "",
    parent: data.parent || null,
    feature: data.feature || null,
  };
};