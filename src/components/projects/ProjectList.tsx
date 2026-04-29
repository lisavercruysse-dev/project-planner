import { ColorsPrimary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import { ProjectType } from "@/src/types/ProjectType"
import { useState } from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import AddProjectModal from "../modals/projects/addProjectModal"
import Project from "./Project"


type Props = {
  projects: ProjectType[],
  buttonEnabled: boolean,
  onProjectAdded: (project: ProjectType) => void,
}

export default function ProjectList({projects, buttonEnabled, onProjectAdded}: Props) {
  const [addProjectVisible, setAddProjectVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        {projects.map(p => {
          return (
            <Project key={p.id} project={p}/> 
          )
        })}
        {buttonEnabled && (
          <Pressable onPress={() => setAddProjectVisible(true)} style={styles.button}>
            <Text style={styles.buttonText}>
              Add new
            </Text>
          </Pressable>
        )}
      </View>
      <Modal 
        visible={addProjectVisible}
        onRequestClose={() => setAddProjectVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <Pressable onPress={() => setAddProjectVisible(false)} style={styles.modalBackground}>
          <View style={styles.modal}>
            <AddProjectModal onClose={() => setAddProjectVisible(false)} onProjectAdded={onProjectAdded}/>
          </View>
        </Pressable>
      </ Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: ColorsPrimary.VAR7,
    paddingHorizontal: 12,
    paddingVertical: 4, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD,
    fontSize: 16
  },
  sectionContainer: {
    gap: 15
  },

  modalBackground: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})