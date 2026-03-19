import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PROJECTS, TAGS, TASKS } from '../api/mockata';
import ProgressBar from "../components/general/ProgressBar";
import FilterTasksModal from '../components/modals/FilterTasksModal';
import TaskList from '../components/tasks/TaskList';
import { ColorsPrimary } from "../themes/Colors";
import { FontFamily } from "../themes/Fonts";
import Project from '../types/ProjectType';
import Tag from '../types/TagType';

export type SelectedFilter =
  | { type: "tag"; value: string }
  | { type: "project"; value: number };

export default function Index() {

  const today: Date = new Date()
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).split(",")

  const [tasks, setTasks] = useState(TASKS)
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])

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

  const handleConfirm = (tags: Tag[], projects: Project[]) => {
    setSelectedTags(tags)
    setSelectedProjects(projects)
    setModalVisible(false);

    if(tags.length === 0 && projects.length === 0){
      setFilteredTasks(tasks)
    } else {
      const tagFilter = tags.map((t) => t.name.toLowerCase())

      setFilteredTasks(tasks.filter((t) => {
        const tagMatch = tagFilter.length === 0 || t.tags.some((tag) => tagFilter.includes(tag.name.toLowerCase()));
        const projectMatch = projects.length === 0 || projects.some(p => p.id === t.project.id);
        return tagMatch && projectMatch;
      }));
    }
};

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
            <View style={styles.filterAndSortContainer}>
              <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.iconContainer}>
                <Feather name="filter" size={24} color={ColorsPrimary.VAR9} />
              </Pressable>
              <Pressable>
                <MaterialIcons name="swap-vert" size={24} color={ColorsPrimary.VAR9} />
              </Pressable>
            </View>
          </View>
          <TaskList tasks={filteredTasks} onToggleTask={handleTaskStatusChange}/>
        </View>
      </View>
      <Modal 
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      animationType='fade'
      transparent={true}
      >
        <Pressable style={styles.modalView} onPress={() => setModalVisible(!modalVisible)} >
          <Pressable style={styles.test} onPress={() => {}}>
            <FilterTasksModal tags={TAGS} projects={PROJECTS} onConfirm={handleConfirm} initialSelectedTags={selectedTags} initialSelectedProjects={selectedProjects}/>
          </Pressable>
        </Pressable>
      </Modal>
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

  //Progressbar
  progressContainer: {
    padding: 25
  },
  progressText: {
    color: ColorsPrimary.VAR9,
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
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 10
  },

  //Filtering and Sorting
  filterAndSortContainer: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 15
  },
  modalView: {
    backgroundColor: '#000000' + 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  test: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignSelf: "center",
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})