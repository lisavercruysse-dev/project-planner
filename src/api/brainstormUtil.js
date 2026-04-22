export const mapData = (snapshot) => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      body: data.body,
      feature: data.feature,
    }
  })
}