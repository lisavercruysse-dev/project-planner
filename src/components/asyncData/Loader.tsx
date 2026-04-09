import { ColorsPrimary } from "@/src/themes/Colors"
import { ActivityIndicator, View } from "react-native"


export default function Loader() {
  return (
    <View>
      <ActivityIndicator size="large" color={ColorsPrimary.VAR9}/>
    </View>
  )
}