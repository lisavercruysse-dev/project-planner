import { FeatureType } from "./FeatureType";

export type TaskType = {
  id: string;
  name: string;
  status: string;
  estimatedTime: number;
  date: Date;
  spentTime: number;
  description: string;
  parent: TaskType | null;
  feature: FeatureType | null;
};

export type TaskAction = 
  | {type: "UPDATE_TASK"; id: string; changes: Partial<TaskType>}
  | {type: "SET_TASKS"; payload: TaskType[]}
  | {type: "ADD_TASK"; payload: TaskType}
  | {type: "MERGE_TASKS"; payload: TaskType[]}
