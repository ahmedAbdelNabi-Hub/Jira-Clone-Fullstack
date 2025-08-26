export enum WorkItemStatus {
    ToDo = 0,
    InProgress = 1,
    InReview = 2,
    Done = 3
}

const statusLabels: Record<WorkItemStatus, string> = {
    [WorkItemStatus.ToDo]: 'To Do',
    [WorkItemStatus.InProgress]: 'In Progress',
    [WorkItemStatus.InReview]: 'In Review',
    [WorkItemStatus.Done]: 'Done'
};

export function getStatusLabel(status: WorkItemStatus): string {
    return statusLabels[status] ?? 'Unknown';
}

export const workItemStatusOptions = Object.entries(statusLabels).map(([value, label]) => ({
    value: Number(value),
    label
}));