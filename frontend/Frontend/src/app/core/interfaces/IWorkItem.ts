import { TaskPriority } from "../enum/TaskPriority";
import { TaskType } from "../enum/TaskType";
import { WorkItemStatus } from "../enum/WorkItemStatus";

export interface IWorkItem {
    title: string;
    description?: string;
    status: WorkItemStatus;
    type: TaskType;
    priority: TaskPriority;
    assignedUser?: string;
}