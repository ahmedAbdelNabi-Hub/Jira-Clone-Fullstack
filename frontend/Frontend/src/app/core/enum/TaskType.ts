export enum TaskType {
    Task = 0,
    Bug = 1,
    Story = 2
}

const typeLabels: Record<TaskType, string> = {
    [TaskType.Task]: 'Task',
    [TaskType.Bug]: 'Bug',
    [TaskType.Story]: 'Story'
};

export function getTypeLabel(type: TaskType): string {
    return typeLabels[type] ?? 'Unknown';
}


export const taskTypeOptions = Object.entries(typeLabels).map(([value, label]) => ({
    value: Number(value),
    label
}));
