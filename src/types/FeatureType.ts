import { ProjectType } from "./ProjectType";

export type FeatureType = {
  id: string;
  name: string;
  description: string;
  project: ProjectType | null;
}