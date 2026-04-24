import { createBrainstorm, getBrainstormById, updateBrainstorm } from "@/src/api/brainstorms";
import { getProjectById } from "@/src/api/projects";
import DeleteConfirmModal from "@/src/components/modals/DeleteConfirmModal";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { ProjectType } from "@/src/types/ProjectType";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function BrainstormDetails() {
  const {id, projectId} = useLocalSearchParams<{id: string, projectId: string}>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [name, onChangeName] = useState('')
  const [body, onChangeBody] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isNew = !id

  useEffect(() => {
    const fetchData = async () => {
      const dbProject = await getProjectById(projectId)
      setProject(dbProject)

      if (isNew) return  

      const dbBrainstorm = await getBrainstormById(id)
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
        <Pressable onPress={() => setShowConfirmModal(!showConfirmModal)} style={styles.deleteButton}>
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

      <Modal
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        animationType="fade"
        transparent={true}
      >
        <Pressable onPress={() => setShowConfirmModal(!showConfirmModal)} style={styles.modalBackground}>
            <View style={styles.modal}>
              <DeleteConfirmModal id={id} type={"Brainstorm"}/>
            </View>
        </Pressable>
      </Modal>
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
  },
  modalBackground: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
})