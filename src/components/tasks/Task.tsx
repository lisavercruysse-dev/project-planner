import { getChildTasks, hasChildren } from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ColorsPrimary } from "../../themes/Colors";
import { FontFamily } from "../../themes/Fonts";
import { TaskType } from "../../types/TaskType";
import TaskDetailModal from '../modals/tasks/TaskDetailsModal';

type Props = {
  task: TaskType;
  level?: number;
}

export default function Task ({ task, level =  0}: Props) {

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
    <View style={{ marginLeft: level * 15 }}>
      <View style={styles.taskContainer} key={task.id}>
        <View>
          <Text style={styles.mainText}>{task.name}</Text>
          <Text style={styles.secondaryText}>
            estimated time: {task.estimatedTime}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => setDetailsVisible(!detailsVisible)} style={styles.button}>
            <Text style={styles.buttonText}>View</Text>
          </Pressable>
            <Pressable disabled={!hasKids} onPress={handleExpandTask}>
              <AntDesign name={expanded ? "caret-up" : "caret-down"} size={24} color={hasKids ? ColorsPrimary.VAR9 : "grey"} />
            </Pressable>
        </View>
      </View>

      {expanded && children.map(child => (
        <Task key={child.id} task={child} level={level +1}/>
      ))}

      {/* Modal */}
      <Modal
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(!detailsVisible)}
        animationType='fade'
        transparent={true}
      >
        <Pressable onPress={() => setDetailsVisible(!detailsVisible)} style={styles.modalBackground}>
          <Pressable onPress={() => {}} style={styles.modal}>
            <ScrollView>
              <TaskDetailModal task={task}/>
            </ScrollView>
          </Pressable>
        </Pressable>
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
    borderColor: ColorsPrimary.VAR9 + 10,
    borderBottomWidth: 1
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  button: {
    backgroundColor: ColorsPrimary.VAR9,
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
    fontFamily: FontFamily.SEMIBOLD,
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