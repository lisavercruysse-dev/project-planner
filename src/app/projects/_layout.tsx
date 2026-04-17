import { Stack } from "expo-router"

export default function projectsLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false, 
      animation: "none",
      presentation: "transparentModal"
    }}
    />
  )
}