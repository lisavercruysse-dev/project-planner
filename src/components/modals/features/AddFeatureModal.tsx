import { createFeature } from "@/src/api/features";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { FeatureType } from "@/src/types/FeatureType";
import { ProjectType } from "@/src/types/ProjectType";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  project: ProjectType;
  onCreate: (feature: FeatureType) => void
}

export default function AddFeatureModal ({project, onCreate}: Props) {
  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');

  const handleAddFeature = async() => {
    const feature = await createFeature({
      name: name === '' ? 'untitled' : name,
      description,
      project: project.id
    })
    onCreate(feature)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="extension-puzzle" size={20} color={ColorsPrimary.VAR9} />
        <Text style={styles.title}>
          Add Feature
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>
          Project
        </Text>
        <Text style={styles.info}>
          {project.name}
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
          multiline
          numberOfLines={5}
          onChangeText={onChangeDescription}
        />
      </View>
      <Pressable onPress={() => handleAddFeature()} style={styles.button}>
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
  subTitle: {
    fontSize: 15,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
  },
  info: {
    fontSize: 14,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  },
  section: {
    flexDirection: 'column',
    gap: 5
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
})