import { ColorsPrimary } from '@/src/themes/Colors';
import { FontFamily } from '@/src/themes/Fonts';
import { TaskType } from '@/src/types/TaskType';
import { StyleSheet, Text, View } from "react-native";
import Task from './Task';

type Props = {
  tasks: TaskType[]
}

export default function TaskList({tasks}: Props) {
  return (
    <View>
      <Text style={styles.title}>
        {`Today's Tasks`}
      </Text>
      {tasks?.map((t: TaskType) => {
        return (
          <Task key={t.id} task={t}/>
        )
      })}
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
  }
})