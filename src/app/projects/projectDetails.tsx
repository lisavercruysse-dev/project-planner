import { getProjectById } from "@/src/api/projects"
import { FeatureType } from "@/src/types/FeatureType"
import { ProjectType } from "@/src/types/ProjectType"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { getProjectFeatures } from "../../api/features"
import FeatureList from "../../components/features/FeatureList"
import { ColorsPrimary } from "../../themes/Colors"
import { FontFamily } from "../../themes/Fonts"


export default function ProjectDetails () {
  const [project, setProject] = useState<ProjectType | null>(null)
  const [features, setFeatures] = useState<FeatureType[]>([])
  const {id} = useLocalSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const dbProject = await getProjectById(id);
      const dbFeatures = await getProjectFeatures(id);
      setProject(dbProject)
      setFeatures(dbFeatures)
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
        <FeatureList features={features}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    gap: 30
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
  }
})

