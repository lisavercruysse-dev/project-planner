import { ProjectType } from "./ProjectType";

export type BrainstormType = {
  id: string;
  name: string;
  body: string;
  project: ProjectType
}