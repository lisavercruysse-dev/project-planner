import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import Task from "@/src/types/TaskType";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    tasks: Task[];
}

export default function ProgressBar({tasks}: Props) {

    const completedTasksCount = tasks.filter(t => t.status === "completed").length 
    const progress = tasks.length === 0 ? 0 : (completedTasksCount / tasks.length) * 100
    const uncompletedTasksCount = tasks.length - completedTasksCount;
   
    const taskProgressMessage =
    progress === 100
      ? "You are done for today!"
      : `Complete ${uncompletedTasksCount} more ${uncompletedTasksCount === 1 ? "task" : "tasks"} today!`;

    return (
        <View>
            <Text style={styles.progressText}>
                {taskProgressMessage}
            </Text>
            <View style={styles.barContainer}>
                <View style={[styles.progress, {width: `${progress}%`}]}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        backgroundColor: ColorsPrimary.VAR1,
        width: 300,
        height: 30,
        borderRadius: 30,
        overflow: "hidden"
    },
    progress: {
        backgroundColor: ColorsPrimary.VAR7,
        height: 30,
        borderRadius: 30,
    },
    progressText: {
    color: ColorsPrimary.VAR9,
    fontSize: 12,
    fontFamily: FontFamily.LIGHT,
    textAlign: "center",
    padding: 5
  },
})