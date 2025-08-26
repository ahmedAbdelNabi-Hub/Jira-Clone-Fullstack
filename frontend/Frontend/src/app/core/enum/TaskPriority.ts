
export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3
}
const priorityLabels: Record<TaskPriority, string> = {
    [TaskPriority.Low]: 'Low',
    [TaskPriority.Medium]: 'Medium',
    [TaskPriority.High]: 'High',
    [TaskPriority.Critical]: 'Critical'
};
export function getPriorityLabel(priority: TaskPriority): string {
    return priorityLabels[priority] ?? 'Unknown';
}




export const taskPriorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({
    value: Number(value),
    label
}));