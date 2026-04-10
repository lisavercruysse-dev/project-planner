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