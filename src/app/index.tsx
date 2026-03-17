import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TASKS } from '../api/mockata';
import ProgressBar from "../components/general/ProgressBar";
import TaskList from '../components/tasks/TaskList';
import { Colors } from "../themes/Colors";
import { FontFamily } from "../themes/Fonts";

export default function Index() {

  const today: Date = new Date()
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).split(",")

  const [tasks, setTasks] = useState(TASKS)

  const completedTasksCount = tasks.filter(t => t.status === "completed").length 
  const progress = tasks.length === 0 ? 0 : (completedTasksCount / tasks.length) * 100
  const uncompletedTasksCount = tasks.length - completedTasksCount;

  const taskProgressMessage =
    progress === 100
      ? "You are done for today!"
      : `Complete ${uncompletedTasksCount} more ${uncompletedTasksCount === 1 ? "task" : "tasks"} today!`;


  const handleTaskStatusChange = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "planned" : "completed" }
          : t
      )
    );
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
        <View style={styles.centerImage}>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {taskProgressMessage}
          </Text>
          <ProgressBar progress={progress}/>
        </View>
        <View style={styles.todayTasksContainer}>
          <View style={styles.todayTasksTop}>
            <Text style={styles.tasksTitle}>
              {`Today's Tasks`}
            </Text>
            <View style={styles.iconContainer}>
              <Feather name="filter" size={24} color={Colors.VAR9} />
              <MaterialIcons name="swap-vert" size={24} color={Colors.VAR9} />
            </View>
          </View>
          <TaskList tasks={TASKS} onToggleTask={handleTaskStatusChange}/>
        </View>
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
    color: Colors.VAR9,
    fontFamily: FontFamily.BOLD,
    fontSize: 40,
  },
  centerImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: Colors.VAR9,
    borderWidth: 1,
    backgroundColor: Colors.VAR1,
  },

  //Quote and date
  dateContainer: {
    backgroundColor: Colors.VAR9,
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
    color: Colors.VAR1,
    fontFamily: FontFamily.MEDIUM,
    fontSize: 20,
    textAlign: "center",
    maxWidth: 70
  },
  quoteContainer: {
    borderTopColor: Colors.VAR9 + 20,
    borderTopWidth: 1,
    borderBottomColor: Colors.VAR9 + 20,
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
    color: Colors.VAR9
  },

  //Progressbar
  progressContainer: {
    padding: 25
  },
  progressText: {
    color: Colors.VAR9,
    fontSize: 12,
    fontFamily: FontFamily.LIGHT,
    textAlign: "center",
    padding: 5
  },

  //Today's Tasks
  todayTasksTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
  },
  todayTasksContainer: {
    flexDirection: 'column',
    gap: 5,
    padding: 5
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10
  },
  tasksTitle: {
    fontFamily: FontFamily.BOLD,
    fontSize: 18,
    color: Colors.VAR9,
    paddingHorizontal: 10
  },
})