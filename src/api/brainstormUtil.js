export const mapData = (snapshot) => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      body: data.body,
      project: data.project,
    }
  })
}

export const mapSingleData = (id, data) => ({
  id,
  name: data.name,
  body: data.body,
  project: data.project || null,
})