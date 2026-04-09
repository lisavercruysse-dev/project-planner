import { TaskType } from '@/src/types/TaskType';
import { View } from "react-native";
import Task from './Task';

type Props = {
  tasks: TaskType[]
}

export default function TaskList({tasks}: Props) {
  return (
    <View>
      {tasks?.map((t: TaskType) => {
        return (
          <Task key={t.id} task={t}/>
        )
      })}
    </View>
  )
}
