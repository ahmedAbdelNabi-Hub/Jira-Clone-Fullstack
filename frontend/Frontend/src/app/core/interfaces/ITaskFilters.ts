import { TaskPriority } from "../enum/TaskPriority";
import { TaskType } from "../enum/TaskType";
import { WorkItemStatus } from "../enum/WorkItemStatus";

export interface ITaskFilters {
    statuses: WorkItemStatus[];
    types: TaskType[];
    priorities: TaskPriority[];
    assignedUserId: string ;
    search : string;
}