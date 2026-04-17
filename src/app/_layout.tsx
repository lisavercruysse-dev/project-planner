import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Tabs } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar/TopBar";
import { TaskProvider } from '../context/TaskContext';
import { ColorsPrimary } from '../themes/Colors';
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
    <TaskProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <TopBar />
          <View style={{ flex: 1 }}>
            <Tabs screenOptions={{ 
                headerShown: false, 
                tabBarActiveTintColor: ColorsPrimary.VAR7, 
                animation: "none", 
                tabBarShowLabel: false,
                tabBarStyle: {
                      height: 20,
                      shadowColor: "transparent",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      elevation: 0,
                      borderTopWidth: 0,
                }
              }} 
              >
              <Tabs.Screen name='index' options={{
                tabBarIcon: ({color, size}) => <FontAwesome5 name="home" size={size} color={color} />,
                tabBarShowLabel: false,
              }}/>
              <Tabs.Screen name='projects' options={{
                tabBarIcon: ({color, size}) => <Ionicons name="file-tray-stacked" size={size} color={color} />,
                tabBarShowLabel: false,
              }}/>
              <Tabs.Screen name='tasks' options={{
                tabBarIcon: ({color, size}) => <FontAwesome5 name="tasks" size={size} color={color} />,
                tabBarShowLabel: false,
              }}/>
              <Tabs.Screen name='brainstorm' options={{
                tabBarIcon: ({color, size}) => <FontAwesome5 name="brain" size={size} color={color} />,
                tabBarShowLabel: false,
              }}/>
            </Tabs>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});