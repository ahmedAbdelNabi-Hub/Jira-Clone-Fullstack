import { ITaskItem } from "./ITaskItem";
export interface ISprint {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    projectId: number;
    tasks: ITaskItem[];
}