import { getTaskDetails } from '@/src/api';
import { ColorsPrimary } from '@/src/themes/Colors';
import { FontFamily } from '@/src/themes/Fonts';
import { TaskType } from '@/src/types/TaskType';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";


type Props = {
  task: TaskType
}

type TaskDetailsType = {
  task: any;
  feature: any;
  project: any;
  parent: any;
}

export default function TaskDetailModal({task}: Props) {
  const [taskDetails, setTaskDetails] = useState<TaskDetailsType | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchTaskDetails() {
      const details = await getTaskDetails(task.id);
      if (isMounted) setTaskDetails(details)
    }

    fetchTaskDetails();
    return () => {isMounted = false}
  }, [task.id])

  return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <FontAwesome name="search" size={20} color={ColorsPrimary.VAR9} />
          <Text style={styles.title}>
            Details
          </Text>
        </View>

          <View style={styles.midSectionContainer}>
            <Text style={styles.taskName}>
              {task.name}
            </Text>
            <Text style={styles.description}>
              {task.description}
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
              Estimated time: {task.estimatedTime}
            </Text>
            <Text style={styles.details}>
              Spent time: {task.timeSpent}
            </Text>
          </View>

          <Pressable style={styles.completeButton}>
            <Text style={styles.completeButtonText}>
              Mark as completed
            </Text>
          </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 30,
    padding: 10
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
  }
}) 