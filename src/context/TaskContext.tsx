import { createContext, useContext, useReducer } from "react";
import { TaskAction, TaskType } from "../types/TaskType";

type Props = {
  children: React.ReactNode;
}

type TaskContextType = {
  tasks: TaskType[];
  dispatch: React.Dispatch<TaskAction>;
};

const TaskContext = createContext<TaskContextType | null>(null);

  const taskReducer = (state: TaskType[], action: TaskAction): TaskType[] => {
    switch(action.type) {
      case 'UPDATE_TASK':
        return state.map(task =>
          task.id === action.id
            ? { ...task, ...action.changes }
            : task
        );
      case "ADD_TASK":
        return [action.payload, ...state];
      case 'SET_TASKS':
        return action.payload;
      default:
        return state;
    }
  }

export function TaskProvider ({children}: Props) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{tasks, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
}