import Tag from '../types/TagType';

type Task = {
  id: number;
  name: string;
  project: string;
  estimatedTime: number;
  tags: Tag[];
  status: string;
  date: Date;
}

export default Task;