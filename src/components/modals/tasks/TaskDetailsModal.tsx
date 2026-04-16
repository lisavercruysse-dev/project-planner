import { useTasks } from '@/src/context/TaskContext';
import { ColorsPrimary } from '@/src/themes/Colors';
import { FontFamily } from '@/src/themes/Fonts';
import { TaskType } from '@/src/types/TaskType';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getTaskDetails, updateTask } from '../../../api/tasks';
import AsyncData from '../../asyncData/AsyncData';
import AddSpentTimeModal from './AddSpentTimeModal';


type Props = {
  task: TaskType;
}

type TaskDetailsType = {
  task: any;
  feature: any;
  project: any;
  parent: any;
}

export default function TaskDetailModal({task}: Props) {
  const {dispatch} = useTasks();

  const [taskDetails, setTaskDetails] = useState<TaskDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [addTimeVisible, setAddTimeVisible] = useState(false);
  const [functionCalled, setFunctionCalled] = useState("")

  const fetchTaskDetails = useCallback(async () => {
    setLoading(true);
    try {
      const details = await getTaskDetails(task.id);
      setTaskDetails(details);
    } finally {
      setLoading(false);
    }
  }, [task.id]);

  useEffect(() => {
    fetchTaskDetails()
  }, [task.id, fetchTaskDetails])

  const update = async () => {
    setAddTimeVisible(false)
    await fetchTaskDetails()
  }

  const markIncomplete = async () => {
    const changes = {spentTime: Number(taskDetails?.task.timeSpent) || 0, status: "planned"};
    await updateTask(task.id, changes);
    dispatch({type: "UPDATE_TASK", id: task.id, changes});
    setTaskDetails(prev => prev ? {...prev, task: {...prev.task, ...changes}} : prev)
  }

  return (
        <AsyncData loading={loading}>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.titleContainer}>
                <FontAwesome name="search" size={20} color={ColorsPrimary.VAR9} />
                <Text style={styles.title}>
                  Details
                </Text>
              </View>
              {taskDetails?.task.status === "completed" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={40}
                    color="#78C72C"
                    style={{ alignSelf: "center" }}
                  />
                )}
              {taskDetails?.task.status === "in progress" && (
                <MaterialCommunityIcons name="clock" size={40} color="#F0CB24" />
              )}
              {taskDetails?.task.status === "planned" && (
                <MaterialIcons name="flag-circle" size={40} color="#3881E0" />
              )}
            </View>
              <View style={styles.midSectionContainer}>
                <Text style={styles.taskName}>
                  {taskDetails?.task.name}
                </Text>
                <Text style={styles.description}>
                  {taskDetails?.task.description}
                </Text>
              </View>

              <View style={styles.midSectionContainer}>
                <Text style={styles.details}>
                  Project: {taskDetails?.project
                  .name}
                </Text>
                <Text style={styles.details}>
                  Feature: {taskDetails?.feature.name}
                </Text>
                <Text style={styles.details}>
                  Parent task: {taskDetails?.parent ? taskDetails.parent.name : "/"}
                </Text>
              </View>

              <View style={styles.midSectionContainer}>
                <Text style={styles.details}>
                  Estimated time: {taskDetails?.task.estimatedTime}
                </Text>
                <Text style={styles.details}>
                  Spent time: {taskDetails?.task.timeSpent}
                </Text>
              </View>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => { 
                    setFunctionCalled("addSpentTime")
                    setAddTimeVisible(!addTimeVisible) }} 
                    style={styles.completeButton}>
                  <Text style={styles.completeButtonText}>
                    Add spent time
                  </Text>
                </Pressable>
                <Pressable 
                  onPress={() => {
                      if (taskDetails?.task.status === "completed") {
                        markIncomplete(); 
                      } else {
                        setFunctionCalled("complete");
                        setAddTimeVisible(true);
                      }
                    }}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeButtonText}>
                    {taskDetails?.task.status === "completed" ? "incomplete" : "complete"}
                  </Text>
                </Pressable>
            </View>
          </View>
            <Modal
              visible={addTimeVisible}
              onRequestClose={() => setAddTimeVisible(false)}
              animationType='fade'
              transparent={true}
            >
              <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
              >
                <Pressable 
                  onPress={() => setAddTimeVisible(false)} 
                  style={styles.modalBackground}
                >
                  <View style={styles.modal}>  
                    {taskDetails &&
                      <AddSpentTimeModal task={taskDetails.task} calledFunction={functionCalled} onClose={update}/>
                    }
                  </View>
                </Pressable>
              </ScrollView>
            </Modal>
        </AsyncData>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    padding: 10,
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  midSectionContainer: {
    flexDirection: 'column',
    gap: 2,
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 10
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.BOLD,
    color: ColorsPrimary.VAR9
  },

  taskName: {
    fontSize: 18,
    fontFamily: FontFamily.SEMIBOLD,
    color: ColorsPrimary.VAR9
  },
  description: {
    fontSize: 12,
    fontFamily: FontFamily.REGULAR,
    color: ColorsPrimary.VAR9
  },
  details: {
    color: ColorsPrimary.VAR9,
    fontFamily: FontFamily.SEMIBOLD,
    fontSize: 15
  },

  completeButton: {
    backgroundColor: ColorsPrimary.VAR9,
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  completeButtonText: {
    color: ColorsPrimary.VAR1,
    fontFamily: FontFamily.BOLD,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10
  },
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
}) 