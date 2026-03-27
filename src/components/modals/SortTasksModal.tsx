import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RadioButtonList from "../radioButton/RadioButtonList";

type Props = {
  onConfirm: (selectedOption: string) => void,
}

export default function SortTasksModal({onConfirm}: Props) {

  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const sortItems = ["name", "project", "estimated time"]

  const handleConfirm = () => {
    if (selectedOption !== null) {
      const selectedValue = sortItems[selectedOption];
      onConfirm(selectedValue)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="swap-vert" size={24} color={ColorsPrimary.VAR9} />
        <Text style={styles.title}>
          Sort your tasks
        </Text>
      </View>
      <View>
        <RadioButtonList listItems={sortItems} selectedIndex={selectedOption} onSelect={setSelectedOption}/>
      </View>
      <Pressable>
        <Text style={styles.confirmButton} onPress={handleConfirm}>
          Confirm
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30
  },
  titleContainer: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      alignSelf: "center"
    },
    title: {
      color: ColorsPrimary.VAR9,
      fontFamily: FontFamily.BOLD,
      fontSize: 18,
      padding: 5
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
})