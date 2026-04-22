import { Stack } from "expo-router"

export default function brainstormsLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false, 
      animation: "none",
      presentation: "transparentModal"
    }} 
    />
  )
}