import { BrainstormType } from "@/src/types/BrainstormType";
import { View } from "react-native";
import Brainstorm from "./Brainstorm";

type Props = {
  brainstorms: BrainstormType[]
}

export default function BrainstormList ({brainstorms}: Props) {
  return (
    <View>
      {brainstorms.map(b => {
        return (
          <View key={b.id}>
            <Brainstorm brainstorm={b}/>
          </View>
        )
      })}
    </View>
  )
}