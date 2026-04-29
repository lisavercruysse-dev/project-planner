import { ColorsPrimary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import { ProjectType } from "@/src/types/ProjectType"
import { Link } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Tag from "../tags/Tag"
import { Colors } from "../tags/TagColors"

type Props = {
  project: ProjectType;
}

export default function Project({project}: Props) {
  const pickColor = (): Colors => {
    switch (project.type) {
      case "softwareDev":
        return Colors.BLUE;
      case "gameDev":
        return Colors.GREEN;
      default:
        return Colors.BLUE; 
    }
  };

  const color = pickColor();

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {project.name}
        </Text>
        <Tag color={color} value="Software Dev"/>
      </View>

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
    backgroundColor: ColorsPrimary.VAR7,
    paddingHorizontal: 12,
    paddingVertical: 4, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD
  },

  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    borderColor: ColorsPrimary.VAR9 + 30,
    borderBottomWidth: 1,
  },
  nameContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  name: {
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  }
})