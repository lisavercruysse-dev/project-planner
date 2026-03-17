import TaskType from "@/src/types/TaskType";
import { StyleSheet, View } from "react-native";
import Task from "./Task";

type Props = {
  tasks: TaskType[];
  onToggleTask: (id: number) => void;
}

export default function TaskList({tasks, onToggleTask}: Props) {
  
  return (
    <View style={styles.tasksContainer}>
      {
        tasks.map((t) => {
          return (
            <Task key={t.id} task={t} onToggleTask={onToggleTask}/>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tasksContainer: {
    flexDirection: "column",
    gap: 10
  }
})