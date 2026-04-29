import ProjectList from "@/src/components/projects/ProjectList"
import { ProjectType } from "@/src/types/ProjectType"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { getAllProjects } from "../../api/projects"
import { ColorsPrimary } from "../../themes/Colors"
import { FontFamily } from "../../themes/Fonts"

export default function Projects () {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const dbProjects = await getAllProjects()
        setProjects(dbProjects)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const currentProjects = projects.filter(p => p.status !== "completed");
  const completedProjects = projects.filter(p => p.status === "completed");

  return (
    <ScrollView style={{backgroundColor: "white", flex: 1}}>

      <View style={styles.container}>
        <Text style={styles.title}>
          Projects
        </Text>
        <Text style={styles.subTitle}>
          Current Projects
        </Text>
        <ProjectList projects={currentProjects} buttonEnabled={true} onProjectAdded={(project) => setProjects(prev => [...prev, project])}/>
      </View>
      <View style={styles.container}>
        <Text style={styles.subTitle}>
          Completed Projects
        </Text>
        <ProjectList projects={completedProjects} buttonEnabled={false} onProjectAdded={(project) => setProjects(prev => [...prev, project])}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    gap: 20,
  },
  title: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 25,
  },
  subTitle: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 20
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
  }
})