import { useTasks } from '@/src/context/TaskContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getChildTasks, hasChildren } from '../../api/tasks';
import { ColorsPrimary } from "../../themes/Colors";
import { FontFamily } from "../../themes/Fonts";
import { TaskType } from "../../types/TaskType";
import TaskDetailModal from '../modals/tasks/TaskDetailsModal';


type Props = {
  task: TaskType;
  level?: number;
}

export default function Task ({ task, level =  0}: Props) {
  const {tasks} = useTasks();
  const taskData = tasks.find(t => t.id === task.id) ?? task;

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<TaskType[]>([]);
  const [hasKids, setHasKids] = useState(false)


  useEffect(() => {
    hasChildren(task.id).then(setHasKids);
  }, [task.id])

  const handleExpandTask = async () => {
    if (!expanded) {
      const childTasks = await getChildTasks(task.id);
      setChildren(childTasks);
    }
    setExpanded(!expanded);
  }
    
return (
  <View>
    <View style={{ marginLeft: level * 15 }}>
      <View style={styles.taskContainer} key={task.id}>
        <View>
          <Text style={styles.mainText}>{task.name}</Text>
          <Text style={styles.secondaryText}>
            estimated time: {task.estimatedTime}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setDetailsVisible(!detailsVisible)}
            style={[
              styles.button,
              { backgroundColor: taskData.status === "completed" ? "#78C72C" : taskData.status === "in progress" ? "#F0CB24" : ColorsPrimary.VAR9}
            ]}
          >
            <Text style={styles.buttonText}>View</Text>
          </Pressable>
          <Pressable disabled={!hasKids} onPress={handleExpandTask}>
            <AntDesign name={expanded ? "caret-up" : "caret-down"} size={24} color={hasKids ? ColorsPrimary.VAR9 : "grey"} />
          </Pressable>
        </View>
      </View>
    </View>
    <View style={{ borderBottomWidth: 1, borderColor: ColorsPrimary.VAR9 + 10 }} />

    {expanded && children.map(child => (
      <Task key={child.id} task={child} level={level + 1}/>
    ))}

      <Modal
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(!detailsVisible)}
        animationType='fade'
        transparent={true}
      >
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Pressable onPress={() => setDetailsVisible(false)} style={styles.modalBackground}>
            <View style={styles.modal}>  
              <ScrollView keyboardShouldPersistTaps="handled">
                <TaskDetailModal task={taskData}/>
              </ScrollView>
            </View>
          </Pressable>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD,
  },
  mainText: {
    fontSize: 15,
    fontFamily: FontFamily.MEDIUM,
    color: ColorsPrimary.VAR9
  },
  secondaryText: {
    fontSize: 12,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  },
  
  // Modal
  modalBackground: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});