import { IMember } from "./IMember";

export interface ITaskItem {
  id: number;
  title: string;
  description?: string;
  status: number;
  type: number;
  priority: number;
  sprintId?: number;
  projectId: number;
  assignedUsers: IMember[];
}