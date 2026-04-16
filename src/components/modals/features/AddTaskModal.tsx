import { ColorsPrimary } from '@/src/themes/Colors';
import { FontFamily } from '@/src/themes/Fonts';
import { FeatureType } from '@/src/types/FeatureType';
import { TaskType } from '@/src/types/TaskType';
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  parent: FeatureType | TaskType
}

export default function AddTaskModal({parent}: Props) {
  const [name, onChangeName] = useState('');
  const [description, onChangeDescription] = useState('');
  const [estimatedTime, onChangeTime] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  
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
          {parent.name}
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
        placeholder='name'
        keyboardType='numeric'
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          Planned date
        </Text>
        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
          <Text>{date?.toLocaleDateString()}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker 
            value={date}
            mode='date'
            onChange={(event, selected) => {
              setShowPicker(false)
              if(selected) setDate(selected)
            }}
          />
        )
        }
      </View>
      <Pressable style={styles.button}>
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