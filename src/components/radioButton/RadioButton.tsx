import { ColorsPrimary } from "@/src/themes/Colors";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  isSelected: boolean,
  onSelect: () => void;
}

export default function RadioButton({isSelected, onSelect} : Props) {
  return (
    <Pressable
      style={[styles.buttonContainer, isSelected && { borderWidth: 2 }]}
      onPress={onSelect}
    >
      <View
        style={[
          styles.buttonSelected,
          {borderRadius: 9, backgroundColor: "white"},
          isSelected && { backgroundColor: ColorsPrimary.VAR9 }
        ]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderBlockColor: ColorsPrimary.VAR9
  },
  buttonSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
  }
})