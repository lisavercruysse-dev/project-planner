import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getTodaysTasks } from "../api/tasks";
import AsyncData from "../components/asyncData/AsyncData";
import ProgressBar from "../components/general/ProgressBar";
import Tasklist from "../components/tasks/TaskList";
import { auth } from "../config/FirebaseConfig";
import { useTasks } from "../context/TaskContext";
import { ColorsPrimary } from "../themes/Colors";
import { FontFamily } from "../themes/Fonts";

export type SelectedFilter =
  | { type: "tag"; value: string }
  | { type: "project"; value: number };

export default function Index() {

  const [loading, setLoading] = useState(false)
  const {dispatch, tasks} = useTasks();

  useEffect(() => {
    setLoading(true);

    signInAnonymously(auth).catch(console.error);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const dbTasks = await getTodaysTasks();
        dispatch({type: "SET_TASKS", payload: dbTasks})
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);


  const today: Date = new Date()
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).split(",")

  return (
    <ScrollView 
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFFF" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Project Planner</Text>
        <View style={styles.dateQuoteContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {formattedDate}
            </Text>
          </View>
          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              {`Do your best every day, and remember that your best will look different each day. But that’s perfectly okay.`}
            </Text>
          </View>
        </View>
          <View style={styles.centerImage}/>
          <View style={styles.progressBar}>
            <ProgressBar />
          </View>
          <Text style={styles.todayTasks}>{`Today's Tasks`}</Text>
          <AsyncData loading={loading}>
            <Tasklist tasks={tasks}/>
          </AsyncData>
      </View>
    </ScrollView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFF",
    flex: 1,
    padding: 15,
  },
  title: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.BOLD,
    fontSize: 40,
  },
  centerImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: ColorsPrimary.VAR9,
    borderWidth: 1,
    backgroundColor: ColorsPrimary.VAR1,
  },
  progressBar: {
    marginTop: 15,
    marginBottom: 35
  },

  //Quote and date
  dateContainer: {
    backgroundColor: ColorsPrimary.VAR9,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  dateQuoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  date: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.MEDIUM,
    fontSize: 20,
    textAlign: "center",
    maxWidth: 70
  },
  quoteContainer: {
    borderTopColor: ColorsPrimary.VAR9 + 20,
    borderTopWidth: 1,
    borderBottomColor: ColorsPrimary.VAR9 + 20,
    borderBottomWidth: 1,
    width: 270,
    height: 80,
    marginLeft: -20,
    alignItems: "center",
    justifyContent: "center"
  },
  quote: {
    fontFamily: FontFamily.BOLD,
    paddingLeft: 27,
    fontSize: 13,
    color: ColorsPrimary.VAR9
  },
  todayTasks: {
    fontFamily: FontFamily.BOLD,
    fontSize: 20,
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 15,
    alignSelf: "flex-start"
  }

})