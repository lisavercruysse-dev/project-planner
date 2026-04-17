import { ColorsPrimary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import { ProjectType } from "@/src/types/ProjectType"
import { Link } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  project: ProjectType;
}

export default function Project({project}: Props) {
  return (
    <View>
      <Text>
        {project.name}
      </Text>
      <Link href={`/projects/projectDetails?id=${project.id}`} push asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            View
          </Text>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
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