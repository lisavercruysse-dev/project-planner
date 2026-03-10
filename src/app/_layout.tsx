import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { FontFamily } from '../themes/Fonts';

export default function RootLayout() {
  const [loaded] = useFonts({
        [FontFamily.BOLD]: require("../assets/fonts/Gantari-Bold.ttf"),
        [FontFamily.LIGHT]: require("../assets/fonts/Gantari-Light.ttf"),
        [FontFamily.MEDIUM]: require("../assets/fonts/Gantari-Medium.ttf"),
        [FontFamily.REGULAR]: require("../assets/fonts/Gantari-Regular.ttf"),
        [FontFamily.SEMIBOLD]: require("../assets/fonts/Gantari-SemiBold.ttf")
    })
    
    if (!loaded) return null

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TopBar/>
        <Stack
        screenOptions={{headerShown: false,}}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});