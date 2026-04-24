import { createBrainstorm, getBrainstormById, updateBrainstorm } from "@/src/api/brainstorms";
import { getProjectById } from "@/src/api/projects";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { BrainstormType } from "@/src/types/BrainstormType";
import { ProjectType } from "@/src/types/ProjectType";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function BrainstormDetails() {
  const {id, projectId} = useLocalSearchParams();
  const [brainstorm, setBrainstorm] = useState<BrainstormType | null>(null);
  const [project, setProject] = useState<ProjectType | null>(null);

  const [name, onChangeName] = useState('')
  const [body, onChangeBody] = useState('')
  const isNew = !id

  useEffect(() => {
    const fetchData = async () => {
      const dbProject = await getProjectById(projectId)
      setProject(dbProject)

      if (isNew) return  

      const dbBrainstorm = await getBrainstormById(id)
      setBrainstorm(dbBrainstorm)
      onChangeName(dbBrainstorm?.name)
      onChangeBody(dbBrainstorm?.body)
    }
    fetchData()
  }, [id])

  const saveBrainstorm = async() => {
    if (!id) {
      await createBrainstorm({
        name: name === '' ? 'untitled' : name,
        body,
        project: project?.id
      })
    }
    else if (id) {
      await updateBrainstorm(id, {
        name: name === '' ? 'untitled' : name,
        body
      })
    }
    router.back()
  }

  return (
    <ScrollView style={{backgroundColor: "white", flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.project}>
          Projects - {project?.name}
        </Text>
        <TextInput 
          value={name}
          onChangeText={onChangeName}
          style={styles.nameInput}
          placeholder="Name"
        />
        <TextInput 
          value={body}
          onChangeText={onChangeBody}
          style={styles.body}
          placeholder="Start brainstorming..."
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </Pressable>
        <Pressable onPress={() => saveBrainstorm()} style={styles.saveButton}>
          <Text style={styles.buttonText}>
            Save
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    padding: 20
  },
  nameInput: {
    fontSize: 22,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    marginTop: 30 
  },
  project: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 25
  },
  body: {
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9,
    fontSize: 15
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  saveButton: {
    backgroundColor: ColorsPrimary.VAR9,
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD
  }
})