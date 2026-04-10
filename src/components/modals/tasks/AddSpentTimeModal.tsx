import { updateTask } from "@/src/api"
import { ColorsPrimary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import { TaskType } from "@/src/types/TaskType"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native"

type Props = {
  task: TaskType,
  onClose: () => void,
  calledFunction: string
}

export default function AddSpentTimeModal ({task, onClose, calledFunction}: Props) {
  const [minutes, onChangeMinutes] = useState('')

  const update = async (time: number) => {
    let newStatus: string = task.status;

    if (calledFunction === "complete") {
      newStatus = task.status === "completed" ? "planned" : "completed";
    } else if (calledFunction === "addSpentTime" && task.status === "planned") {
      newStatus = "in progress";
    }

    await updateTask(task.id, {
      spentTime: Number(task?.timeSpent) + time || 0,
      status: newStatus
    });
    onClose();
  }
  
  return ( 
    <ScrollView
      keyboardShouldPersistTaps="handled"  // 👈 this is the fix
      contentContainerStyle={styles.container}
    >
      <Text style={styles.label}>
        Amount of minutes spent on this task
      </Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeMinutes}
        placeholder="amount of minutes"
        keyboardType="numeric"
      />
      <Pressable
        onPress={() => update(Number(minutes))}  // no need to manually dismiss
        style={styles.confirmButton}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
    padding: 10
  },
  label: {
    fontFamily: FontFamily.MEDIUM,
    color: ColorsPrimary.VAR9
  },
  container: {
    flexDirection: "column",
    gap: 10,
    alignContent: "center",
    alignItems: "center"
  },
  confirmButton: {
    backgroundColor: ColorsPrimary.VAR9,
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  confirmText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD
  }
})