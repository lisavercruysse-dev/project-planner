import { View } from "react-native";
import Loader from "./Loader";

type Props = {
  loading: boolean,
  children: React.ReactNode,
}

export default function AsyncData({ loading, children }: Props) {
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}