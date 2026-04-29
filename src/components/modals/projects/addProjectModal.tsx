import { createProject } from "@/src/api/projects";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { ProjectType } from "@/src/types/ProjectType";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import RadioButtonList from "../../radioButton/RadioButtonList";

type Props = {
  onClose: () => void,
  onProjectAdded: (newProject: ProjectType) => void,
}

export default function AddProjectModal({onClose, onProjectAdded}: Props) {
  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(null);
  const [typeError, setTypeError] = useState(false);

  const projectTypes = ["software dev", "game dev"];

  const handleAddProject = async() => {
    if (selectedTypeIndex === null) {
      setTypeError(true)
      return;
    }

    const newProject = await createProject({
      name,
      description,
      type: projectTypes[selectedTypeIndex]
    })
    onClose();
    onProjectAdded(newProject);
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="file-tray" size={20} color={ColorsPrimary.VAR9} />
        <Text style={styles.title}>
          Add Project
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>
          Name
        </Text>
        <TextInput 
          style={styles.input}
          placeholder="name"
          onChangeText={onChangeName}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>
          Description
        </Text>
        <TextInput 
          style={styles.input}
          placeholder="description"
          onChangeText={onChangeDescription}
          multiline
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>
          Type
        </Text>
        <RadioButtonList listItems={projectTypes} selectedIndex={selectedTypeIndex} onSelect={(index) => setSelectedTypeIndex(index)}/>
        {typeError && (
          <Text style={styles.error}>
            Type is mandatory
          </Text>
        )}
      </View>
      <Pressable onPress={() => handleAddProject()} style={styles.button}>
        <Text style={styles.buttonText}>
          create
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    gap: 30,
    padding: 10,
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 10
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
  },
  section: {
    flexDirection: 'column',
    gap: 5
  },
  subTitle: {
    fontSize: 15,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
  },
  input: {
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    borderRadius: 15,
    width: "100%",
    padding: 10,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  },
    button: {
    backgroundColor: ColorsPrimary.VAR7,
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
  error: {
    fontFamily: FontFamily.REGULAR,
    color: 'red'
  }
})