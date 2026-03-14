import { Colors } from "@/src/themes/Colors";
import { FontFamily } from "@/src/themes/Fonts";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TaskType from '../../types/TaskType';
import Tag from "./Tag";

export type Props = {
  task: TaskType;
}

export default function Task({task}: Props) {
  const [status, setStatus] = useState(task.status)

  return (
    <View style={[styles.taskContainer, {backgroundColor: status === "completed" ? Colors.VAR7 : Colors.VAR9}]}>
      <View style={[{flexDirection: 'column', gap: 18}]}>
        <View style={[{flexDirection: 'column', gap: 3}]}>
          <View style={styles.taskNameProjectName}>
            <Text style={styles.taskName}>
              {task.name}
            </Text>
          <Text style={styles.projectName}>
            {task.project}
          </Text>
          </View>
          <Text style={styles.estimatedTime}>
            Estimated time: {task.estimatedTime} minutes
        </Text>
      </View>

      <View>
        <View style={styles.tagContainer}>
          {task.tags.map((t) => 
            t ? <Tag key={t.id} tag={t}/> : null
          )}
        </View>
      </View>
    </View>
      <View style={styles.checkBox}>
        <Text>
          {status === "completed" ? <Ionicons name="checkmark" size={24} color={Colors.VAR9} />: ""}
        </Text>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    gap: 5,
  },
  taskName: {
    fontFamily: FontFamily.BOLD,
    fontSize: 15,
    color: Colors.VAR1
  },
  taskContainer: {
    padding: 10,
    borderRadius: 15,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectName: {
    color: Colors.VAR1 + '75',
    fontFamily: FontFamily.SEMIBOLD,
    fontSize: 12,
  },
  taskNameProjectName: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  estimatedTime: {
    fontFamily: FontFamily.MEDIUM,
    color: Colors.VAR1 + '75',
    fontSize: 12
  },
  checkBox: {
    backgroundColor: Colors.VAR1,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
})