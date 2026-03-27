import { ColorsPrimary, ColorsSecondary } from "@/src/themes/Colors"
import { FontFamily } from "@/src/themes/Fonts"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useState } from "react"
import { Pressable, StyleSheet, Text } from "react-native"

type Props<T> = {
  tag: T,
  onSelect: (tag: T, selected: boolean) => void,
  initialSelected?: boolean
}

export default function FilterTag<T extends {id: number, name: string}>({tag, onSelect, initialSelected = false}: Props<T>) {
  const [isSelected, setSelected] = useState(initialSelected)

  const handleSelect = () => {
    const selected = !isSelected
    setSelected(selected)
    onSelect(tag, selected)
  }

  return (
  <Pressable onPress={handleSelect} style={[ styles.container, { borderColor: isSelected ? ColorsSecondary.VAR6 : ColorsPrimary.VAR9 } ]}>
    {isSelected && (
      <FontAwesome name="check-circle" size={16} color={ColorsSecondary.VAR6} style={styles.icon}/>
    )}
    <Text style={[styles.text, { color: isSelected ? ColorsSecondary.VAR6 : ColorsPrimary.VAR9 }]}>
      {tag.name}
    </Text>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "flex-start",
    position: "relative", 
  },
  text: {
    fontFamily: FontFamily.SEMIBOLD
  },
  icon: {
    position: "absolute",
    top: -6,
    right: -6,
  }
})