export const mapData = (snapshot) => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description
    }
  })
}

export const mapSingleData = (id, data) => ({
  id,
  name: data.name,
  description: data.description,
});