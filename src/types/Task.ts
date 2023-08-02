export type TaskQuerySort = 'name' | 'due_date';
export type TaskQueryDir = 'asc' | 'desc'

export function isTaskQuerySort(value: string): value is TaskQuerySort {
  return ['name', 'due_date'].includes(value);
}

export function isTaskQueryDir(value: string): value is TaskQueryDir {
  return ['asc', 'desc'].includes(value);
}

export interface TaskQuery {
  page?: number;
  size?: number;
  term?: string;
  sort?: TaskQuerySort;
  dir?: TaskQueryDir;
}

export type TaskPriority = 'HIGH' | 'NORMAL' | 'LOW';
export type TaskStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
}

export interface Page {
	page: number;
	size: number;
	total: number;
	items: Task[];
}
