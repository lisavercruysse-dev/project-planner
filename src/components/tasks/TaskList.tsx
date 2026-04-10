import { TaskType } from '@/src/types/TaskType';
import { View } from "react-native";
import Task from './Task';

type Props = {
  tasks: TaskType[]
}

export default function TaskList({ tasks }: Props) {
  const rootTasks = tasks.filter(t => t.parent == null);

  return (
    <View>
      {rootTasks.map(t => (
        <Task key={t.id} task={t} />
      ))}
    </View>
  )
}