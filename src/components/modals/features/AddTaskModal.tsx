import { createTask } from '@/src/api/tasks';
import { useTasks } from '@/src/context/TaskContext';
import { ColorsPrimary } from '@/src/themes/Colors';
import { FontFamily } from '@/src/themes/Fonts';
import { FeatureType } from '@/src/types/FeatureType';
import { TaskType } from '@/src/types/TaskType';
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  parent: FeatureType | TaskType,
  type: string,
  onClose: () => void,
}

type FormError = {
  field: string;
  message: string;
};

export default function AddTaskModal({parent, type, onClose}: Props) {
  const { dispatch } = useTasks();

  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');
  const [estimatedTime, onChangeTime] = useState('');
  const [errors, setErrors] = useState<FormError[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  const getError = (field: string) => {
    return errors.find(e => e.field === field)?.message;
  }

  const handleAddTask = async() => {
    const newErrors = []
    if (name === "" || name.length < 2) {
      newErrors.push({
        field: "name",
        message: "Name must be at least 2 characters",
      })
    }
    if (type === "task") {
      const parentTask = parent as TaskType;
      if (date && parentTask.plannedDate) {
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const parentDate = new Date(parentTask.plannedDate);
        const parentDateOnly = new Date(parentDate.getFullYear(), parentDate.getMonth(), parentDate.getDate());

        if (selectedDate > parentDateOnly) {
          newErrors.push({
            field: "date",
            message: "Date cannot be later than the parent task's date"
          })
        }
      }
    }

    setErrors(newErrors)
    if (newErrors.length === 0) {
      try {
        const newTask = await createTask({
          name,
          description: description !== "" ? description : null,
          estimatedTime,
          plannedDate: date || null,
          status: "planned",
          parent: type === "task" ? parent.id : null,
          feature: type === "feature" ? parent.id : null,
          spentTime: 0,
        })

        dispatch({
          type: "ADD_TASK",
          payload: newTask,
        });

        onChangeName("");
        onChangeDescription("")
        onChangeTime("")
        setDate(null)

        onClose();
      } catch (error) {
          console.error("Error creating task:", error);
        }
    }
  }
  
  const [showPicker, setShowPicker] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Feather name="clipboard" size={24} color="black" />
        <Text style={styles.title}>
          Add task
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Parent
        </Text>
        <Text style={{
          fontFamily: FontFamily.REGULAR, 
          color: ColorsPrimary.VAR9, 
          fontSize: 15,
          paddingHorizontal: 10
          }}
        >
          {type === "feature" ? `feature: ${parent.name}` : `task: ${parent.name}`}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Name
        </Text>
        <TextInput 
        style={styles.input}
        onChangeText={onChangeName}
        placeholder='name'
        />
        {getError("name") && (
          <Text style={{color: "red"}}>
            {getError("name")}
          </Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Description
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDescription}
          placeholder='description'
          multiline
          numberOfLines={5}
          textAlignVertical='top'
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Estimated time
        </Text>
        <TextInput 
        style={styles.input}
        onChangeText={onChangeTime}
        placeholder='30'
        keyboardType='numeric'
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Planned date
        </Text>
        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
          <Text>{date ? date.toLocaleDateString() : "Select a date"}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker 
            value={date || new Date()}
            mode='date'
            accentColor={ColorsPrimary.VAR9}
            onChange={(event, selected) => {
              setShowPicker(false)
              if(selected) setDate(selected)
              setErrors(prev => prev.filter(e => e.field !== "date"))
            }}
          />
        )
        }
        {getError("date") && (
          <Text style={{color: "red"}}>
            {getError("date")}
          </Text>
        )}
      </View>
      <Pressable onPress={handleAddTask} style={styles.button}>
        <Text style={styles.buttonText}>
          Add task
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 10
    },
    title: {
      fontSize: 20,
      fontFamily: FontFamily.BOLD,
      color: ColorsPrimary.VAR9
    },
    container: {
      flexDirection: 'column',
      gap: 30,
      padding: 10,
    },
    label: {
      fontSize: 18,
      fontFamily: FontFamily.BOLD,
      color: ColorsPrimary.VAR9,
      paddingHorizontal: 10
    },
    section: {
      flexDirection: "column",
      gap: 5
    },
    input: {
      borderColor: ColorsPrimary.VAR9,
      borderWidth: 1,
      borderRadius: 15,
      width: "90%",
      padding: 10
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
    },
})
