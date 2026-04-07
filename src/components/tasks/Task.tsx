import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ColorsPrimary } from "../../themes/Colors";
import { FontFamily } from "../../themes/Fonts";
import { TaskType } from "../../types/TaskType";

type Props = {
  task: TaskType
}

export default function Task ({task}: Props) {
  return (
    <View style={styles.taskContainer} key={task.id}>
      <View>
        <Text style={styles.mainText}>
          {task.name}
        </Text>
        <Text style={styles.secondaryText}>
          estimated time: {task.estimatedTime}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            View
          </Text>
        </Pressable>
        <Pressable>
          <AntDesign name="caret-up" size={24} color={ColorsPrimary.VAR9} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
    borderColor: ColorsPrimary.VAR9 + 10,
    borderBottomWidth: 1
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  button: {
    backgroundColor: ColorsPrimary.VAR9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD,
  },
  mainText: {
    fontSize: 15,
    fontFamily: FontFamily.SEMIBOLD,
    color: ColorsPrimary.VAR9
  },
  secondaryText: {
    fontSize: 12,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  },
  title: {
    fontFamily: FontFamily.BOLD,
    fontSize: 20,
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 15
  }
})