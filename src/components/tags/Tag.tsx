import { FontFamily } from "@/src/themes/Fonts";
import { StyleSheet, Text, View } from "react-native";
import { Colors, ColorStyles } from "./TagColors";

type Props = {
  color: Colors;
  value: string;
}

export default function Tag({ color, value }: Props) {
  const stylesColor = ColorStyles[color];

  return (
    <View style={[styles.container, { backgroundColor: stylesColor.background }]}>
      <Text style={[styles.text, { color: stylesColor.text }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    fontFamily: FontFamily.REGULAR
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    borderRadius: 15
  }
})