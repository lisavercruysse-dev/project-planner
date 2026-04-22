import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function BrainstormDetails() {
  const {id} = useLocalSearchParams();

  return (
    <ScrollView style={{backgroundColor: "white", flex: 1}}>
      <Text>
        Brainstorm
      </Text>
    </ScrollView>
  )
}