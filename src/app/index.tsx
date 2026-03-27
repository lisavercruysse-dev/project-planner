import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TASKS } from '../api/mockata';
import ProgressBar from "../components/general/ProgressBar";
import TaskList from "../components/tasks/TaskList";
import { ColorsPrimary } from "../themes/Colors";
import { FontFamily } from "../themes/Fonts";
import Task from "../types/TaskType";

export type SelectedFilter =
  | { type: "tag"; value: string }
  | { type: "project"; value: number };

export default function Index() {

  const [tasks, setTasks] = useState(TASKS)

  const today: Date = new Date()
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).split(",")

  const handleToggleTask = (task: Task) => {
    setTasks(prevList =>
      prevList.map(t =>
        t.id === task.id ? {...t, status: t.status === "completed" ? "planned" : "completed"}: t
      )
    )
  }

  return (
    <ScrollView>
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
          <ProgressBar tasks={tasks}/>
        <TaskList tasks={tasks} onToggleTask={handleToggleTask}/>   
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

})