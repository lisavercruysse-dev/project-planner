import { PROJECTS, TAGS } from "@/src/api/mockata";
import { ColorsPrimary } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import Project from "@/src/types/ProjectType";
import Tag from "@/src/types/TagType";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import TaskType from '../../types/TaskType';
import FilterTasksModal from "../modals/FilterTasksModal";
import SortTasksModal from "../modals/SortTasksModal";
import ToggleTaskModal from "../modals/ToggleTaskModal";
import Task from "./Task";

type Props = {
  tasks: TaskType[],
  onToggleTask: (t: TaskType) => void;
}

export default function TaskList({tasks, onToggleTask}: Props) {

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [toggleTaskModalVisible, setToggleTaskModalVisible] = useState(false);
  
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])

  const [currentTask, setCurrentTask] = useState<TaskType | null>(null)

  const handleFilterConfirm = (tags: Tag[], projects: Project[]) => {

      setSelectedTags(tags)
      setSelectedProjects(projects)
      setFilterModalVisible(false);
  
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

  const handleSortConfirm = (option: string) => {
    setSortModalVisible(false);

    let sortedTasks = [...filteredTasks]

    switch (option) {
      case "name": sortedTasks.sort((a, b) => a.name.localeCompare(b.name))
      break;
      case "project": sortedTasks.sort((a, b) => a.project.id - b.project.id)
      break;
      case "estimated time": sortedTasks.sort((a, b) => a.estimatedTime - b.estimatedTime)
      break;
      default: return;
    }

    setFilteredTasks(sortedTasks)
  }

  const handleToggleTask = (task: TaskType) => {
    setCurrentTask(task);
    setToggleTaskModalVisible(true)
  }

  const handleToggleConfirm = (value: string) => {
    if (currentTask) {
      const updatedTask: TaskType = {
        ...currentTask,
        timeSpent: parseInt(value) || 0,
        status: currentTask.status === "completed" ? "planned" : "completed",
      };

      setFilteredTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));

      onToggleTask(updatedTask);

      setToggleTaskModalVisible(false)
      setCurrentTask(null)
    }
  }

  return (
    <View>
      <View style={styles.todayTasksContainer}>
          <View style={styles.todayTasksTop}>
            <Text style={styles.tasksTitle}>
              {`Today's Tasks`}
            </Text>
            <View style={styles.filterAndSortContainer}>
              <Pressable onPress={() => setFilterModalVisible(!filterModalVisible)}>
                <Feather name="filter" size={24} color={ColorsPrimary.VAR9} />
              </Pressable>
              <Pressable onPress={() => setSortModalVisible(!sortModalVisible)}>
                <MaterialIcons name="swap-vert" size={24} color={ColorsPrimary.VAR9} />
              </Pressable>
            </View>
          </View>
          <View style={styles.tasksContainer}>
          {
            filteredTasks.map((t) => {
              return (
                <Task key={t.id} task={t} onToggleTask={() => handleToggleTask(t)}/>
              )
            })
          }
        </View>
      </View>
      <Modal 
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(!filterModalVisible)}
      animationType='fade'
      transparent={true}
      >
        <Pressable style={styles.modalView} onPress={() => setFilterModalVisible(!filterModalVisible)} >
          <Pressable style={styles.test} onPress={() => {}}>
            <FilterTasksModal tags={TAGS} projects={PROJECTS} onConfirm={handleFilterConfirm} initialSelectedTags={selectedTags} initialSelectedProjects={selectedProjects}/>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal 
      visible={sortModalVisible}
      onRequestClose={() => setSortModalVisible(!sortModalVisible)}
      animationType="fade"
      transparent={true}
      >
        <Pressable style={styles.modalView} onPress={() => setSortModalVisible(!sortModalVisible)} >
          <Pressable style={styles.test} onPress={() => {}}>
            <SortTasksModal onConfirm={handleSortConfirm}/>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
      visible={toggleTaskModalVisible}
      onRequestClose={() => setToggleTaskModalVisible(!toggleTaskModalVisible)}
      animationType="fade"
      transparent={true}
      >
        <Pressable style={styles.modalView} onPress={() => setToggleTaskModalVisible(!toggleTaskModalVisible)}>
          <Pressable style={styles.test} onPress={() => {}}>
            <ToggleTaskModal onConfirm={handleToggleConfirm} onCancel={() => setToggleTaskModalVisible(false)} task={currentTask}/>
          </Pressable>
        </Pressable>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  tasksContainer: {
    flexDirection: "column",
    gap: 10
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