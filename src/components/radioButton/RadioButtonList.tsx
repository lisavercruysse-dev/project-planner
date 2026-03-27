import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import { StyleSheet, Text, View } from "react-native";
import RadioButton from "./RadioButton";

type Props = {
  listItems: string[],
  selectedIndex: number | null,
  onSelect: (index: number) => void,
}

export default function RadioButtonList ({listItems, selectedIndex, onSelect}: Props) {

  return (
    <View style={styles.listContainer}>
      {listItems.map((item, index) => {
        return (
          <View key={index} style={styles.buttonContainer}>
            <RadioButton isSelected={selectedIndex === index} onSelect={() => onSelect(index)}/>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  itemText: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.MEDIUM,
    fontSize: 15
  },
  listContainer: {
    flexDirection: "column",
    gap: 15
  }
})