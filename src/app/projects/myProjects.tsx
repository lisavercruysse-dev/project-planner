import ProjectList from "@/src/components/projects/ProjectList"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { getAllProjects } from "../../api/projects"
import { ColorsPrimary } from "../../themes/Colors"
import { FontFamily } from "../../themes/Fonts"

export default function Projects () {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

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

  return (
    <ScrollView style={{backgroundColor: "white", flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Projects
        </Text>
        <ProjectList projects={projects}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
  },
  title: {
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9,
    fontSize: 25
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