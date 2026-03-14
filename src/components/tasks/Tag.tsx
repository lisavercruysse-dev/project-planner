import TagType from "@/src/types/TagType";
import { StyleSheet, Text, View } from "react-native";

export type Props = {
  tag: TagType;
}

export default function Tag({tag}: Props) {
  return (
    <View style={[styles.tag, {backgroundColor: tag.color}]}>
      <Text>
        {tag.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    alignSelf: "flex-start"
  }
})