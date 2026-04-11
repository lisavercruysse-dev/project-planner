export type TaskType = {
  id: string;
  name: string;
  status: string;
  estimatedTime: number;
  date: Date;
  timeSpent: number;
  description: string;
  parent: TaskType | null;
};

export type TaskAction = 
  | {type: "UPDATE_TASK"; id: string; changes: Partial<TaskType>}
  | {type: "SET_TASKS"; payload: TaskType[]}
