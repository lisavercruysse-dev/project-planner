import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import Task from "@/src/types/TaskType";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  task: Task | null;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export default function ToggleTaskModal ({onConfirm, task, onCancel}: Props) {

  const [value, onChangeValue] = useState('')
  const [error, setError] = useState(false)

  const handleConfirm = () => {
    if (task?.status === "completed") {
      onConfirm('0'); 
    } else {
      const minutes = parseInt(value);
      if (minutes > 0) {
        setError(false);
        onConfirm(value);
      } else {
        setError(true);
      }
    }
  };

  return (
    task?.status === "completed" ? 
    <View style={styles.container}>
      <Text style={styles.message}>
        Are you sure you want to mark the task as uncompleted? All previously spent time will be removed.
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButton}>
            Cancel
          </Text>
        </Pressable>
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButton}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
    :
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.message}>
          Amount of minutes spent on this task
        </Text>
        {error && <Text style={styles.error}>You must have spent at least 1 minute on the task</Text>}
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          placeholder="amount of minutes..."
          inputMode="numeric"
        />
      </View>
      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButton}>
          Confirm
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    width: 280,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
    color: ColorsPrimary.VAR9,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5
  },
  container2: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center"
  },
  container: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center"
  },
  message: {
    fontFamily: FontFamily.MEDIUM,
    color: ColorsPrimary.VAR9,
    fontSize: 15,
    textAlign: "center"
  },
  confirmButton: {
    backgroundColor: ColorsPrimary.VAR9,
    color: ColorsPrimary.VAR1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "center",
    borderRadius: 15,
    fontFamily: FontFamily.BOLD,
  },
  cancelButton: {
    backgroundColor: ColorsPrimary.VAR2,
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignSelf: "center",
    borderRadius: 15,
    fontFamily: FontFamily.BOLD,
  },
  error: {
    fontFamily: FontFamily.REGULAR,
    color: "red",
  }
})