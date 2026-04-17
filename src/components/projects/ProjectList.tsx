import { ProjectType } from "@/src/types/ProjectType"
import { StyleSheet, Text, View } from "react-native"
import Project from "./Project"


type Props = {
  projects: ProjectType[],
}

export default function ProjectList({projects}: Props) {
  return (
    <View>
      <Text>
        Projectlist
      </Text>
      {projects.map(p => {
        return (
          <Project key={p.id} project={p}/> 
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    
})