import { getProjectById } from "@/src/api/projects"
import BrainstormList from "@/src/components/brainstorms/BrainstormList"
import { BrainstormType } from "@/src/types/BrainstormType"
import { FeatureType } from "@/src/types/FeatureType"
import { ProjectType } from "@/src/types/ProjectType"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { getProjectBrainstorms } from "../../api/brainstorms"
import { getProjectFeatures } from "../../api/features"
import FeatureList from "../../components/features/FeatureList"
import { ColorsPrimary } from "../../themes/Colors"
import { FontFamily } from "../../themes/Fonts"

export default function ProjectDetails () {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [features, setFeatures] = useState<FeatureType[]>([])
  const [brainstorms, setBrainstorms] = useState<BrainstormType[]>([])

  const [addFeatureVisible, setAddFeatureVisible] = useState(false);
  const [addBrainstormVisible, setAddBrainstormVisible] = useState(false);

  const {id} = useLocalSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const dbProject = await getProjectById(id);
      const dbFeatures = await getProjectFeatures(id);
      const dbBrainstorms = await getProjectBrainstorms(id);
      setProject(dbProject)
      setFeatures(dbFeatures)
      setBrainstorms(dbBrainstorms)
    }
    fetchData()
  }, [id])

  return (
    <ScrollView style={{backgroundColor: "white", flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>
            Projects - {project?.name}
          </Text>
          <Text style={styles.description}>
            {project?.description}
          </Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Features</Text>
          <FeatureList features={features}/>
          <Pressable style={styles.mainButton}>
            <Text style={styles.mainButtonText}>
              Add New
            </Text>
          </Pressable>
        </View>
        <View>
          <Text style={styles.subTitle}>
            Brainstorms
          </Text>
          <BrainstormList brainstorms={brainstorms}/>
            <Pressable style={styles.mainButton}>
              <Text style={styles.mainButtonText}>
                Add New
              </Text>
            </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    gap: 20
  },
  title: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 25
  },
  description: {
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9,
  },
  titleDescriptionContainer: {
    flexDirection: "column",
    gap: 15
  },
  subTitle: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 20
  },

  mainButton: {
    backgroundColor: ColorsPrimary.VAR9,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    margin: 20
  },
  mainButtonText: {
    fontFamily: FontFamily.BOLD,
    fontSize: 18,
    color: ColorsPrimary.VAR1
  }
})

