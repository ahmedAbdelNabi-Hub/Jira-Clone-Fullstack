import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../core/enum/TaskPriority';
import { TaskType } from '../../core/enum/TaskType';
import { WorkItemStatus } from '../../core/enum/WorkItemStatus';

@Pipe({
    name: 'enumLabel',
    standalone: true
})
export class EnumLabelPipe implements PipeTransform {
    private taskTypeLabels: Record<TaskType, string> = {
        [TaskType.Task]: 'Task',
        [TaskType.Bug]: 'Bug',
        [TaskType.Story]: 'Story'
    };

    private priorityLabels: Record<TaskPriority, string> = {
        [TaskPriority.Low]: 'Low',
        [TaskPriority.Medium]: 'Medium',
        [TaskPriority.High]: 'High',
        [TaskPriority.Critical]: 'Critical'
    };

    private statusLabels: Record<WorkItemStatus, string> = {
        [WorkItemStatus.ToDo]: 'To Do',
        [WorkItemStatus.InProgress]: 'In Progress',
        [WorkItemStatus.InReview]: 'In Review',
        [WorkItemStatus.Done]: 'Done'
    };

    transform(value: number, enumType: 'taskType' | 'priority' | 'status'): string {
        switch (enumType) {
            case 'taskType':
                return this.taskTypeLabels[value as TaskType] ?? 'Unknown';
            case 'priority':
                return this.priorityLabels[value as TaskPriority] ?? 'Unknown';
            case 'status':
                return this.statusLabels[value as WorkItemStatus] ?? 'Unknown';
            default:
                return 'Unknown';
        }
    }
}
