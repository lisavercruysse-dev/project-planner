import { FeatureType } from "@/src/types/FeatureType"
import { View } from "react-native"
import Feature from "./Feature"

type Props = {
  features: FeatureType[]
}

export default function FeatureList({features}: Props) {
  return (
    <View>
      {features.map(f => {
        return (
          <Feature key={f.id} feature={f}/>
        )
      })}
    </View>
  )
}