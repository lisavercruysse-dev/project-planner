import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ColorsPrimary } from "../../themes/Colors";
import { FontFamily } from "../../themes/Fonts";
import { TaskType } from "../../types/TaskType";
import TaskDetailModal from '../modals/tasks/TaskDetailsModal';

type Props = {
  task: TaskType
}

export default function Task ({task}: Props) {

  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <View>
      <View style={styles.taskContainer} key={task.id}>
        <View>
          <Text style={styles.mainText}>
            {task.name}
          </Text>
          <Text style={styles.secondaryText}>
            estimated time: {task.estimatedTime}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => setDetailsVisible(!detailsVisible)} style={styles.button}>
            <Text style={styles.buttonText}>
              View
            </Text>
          </Pressable>
          <Pressable>
            <AntDesign name="caret-down" size={24} color={ColorsPrimary.VAR9} />
          </Pressable>
        </View>
      </View>
      <Modal
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(!detailsVisible)}
        animationType='fade'
        transparent={true}
      >
        <Pressable onPress={() => setDetailsVisible(!detailsVisible)} style={styles.modalBackground}>
          <Pressable style={styles.modal}>
            <TaskDetailModal task={task}/>
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
  title: {
    fontFamily: FontFamily.BOLD,
    fontSize: 20,
    color: ColorsPrimary.VAR9,
    paddingHorizontal: 15
  },

  //Modal
  modalBackground: {
    backgroundColor: '#000000' + 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignSelf: "center",
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})