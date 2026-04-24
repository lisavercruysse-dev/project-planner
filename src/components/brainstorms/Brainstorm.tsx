import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { BrainstormType } from "@/src/types/BrainstormType";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  brainstorm: BrainstormType
}

export default function Brainstorm ({brainstorm}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brainstormName}>
        {brainstorm.name}
      </Text>
      <Link href={`/projects/brainstorms/BrainstormDetails?id=${brainstorm.id}&projectId=${brainstorm.project.id}`} push asChild>
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
  brainstormName: {
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9,
    paddingRight: 20,
    paddingVertical: 20,
    fontSize: 16
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: ColorsPrimary.VAR9
  },
  buttonText: {
      color: ColorsPrimary.VAR1,
      fontFamily: FontFamily.BOLD
  },
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,  
    paddingVertical: 5,
    borderColor: ColorsPrimary.VAR9 + 30,
    borderBottomWidth: 1,
  },
})