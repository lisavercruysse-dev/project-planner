import Tag from '../types/TagType';
import Project from './ProjectType';

type Task = {
  id: number;
  name: string;
  project: Project;
  estimatedTime: number;
  tags: Tag[];
  status: string;
  date: Date;
  timeSpent: number;
}

export default Task;