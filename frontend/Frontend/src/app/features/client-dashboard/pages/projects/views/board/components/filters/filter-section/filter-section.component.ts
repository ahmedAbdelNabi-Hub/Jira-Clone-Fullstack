// filter-section.component.ts (for separate HTML template)
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this for ngModel
import { TaskPriority } from '../../../../../../../../../core/enum/TaskPriority';
import { TaskType } from '../../../../../../../../../core/enum/TaskType';
import { ITaskFilters } from '../../../../../../../../../core/interfaces/ITaskFilters';
import { WorkItemStatus } from '../../../../../../../../../core/enum/WorkItemStatus';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
  color?: string;
  status?: string;
}

@Component({
  selector: 'app-filter-section',
  imports: [CommonModule, FormsModule], // Don't forget FormsModule for ngModel
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.css'
})
export class FilterSectionComponent {
  taskFilters!: ITaskFilters;

  @Input() title: string = '';
  @Input() hasInfo: boolean = false;
  @Input() isActive: boolean = false;

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() filtersApplied = new EventEmitter<ITaskFilters>();


  workTypes: FilterOption[] = [
    { id: '' + TaskType.Task, label: 'Task', checked: false, color: 'bg-blue-500' },
    { id: '' + TaskType.Bug, label: 'Bug', checked: false, color: 'bg-red-500' },
    { id: '' + TaskType.Story, label: 'Story', checked: false, color: 'bg-yellow-500' }
  ];

  priorities: FilterOption[] = [
    { id: '' + TaskPriority.High, label: 'High', checked: false, color: 'bg-red-500' },
    { id: '' + TaskPriority.Medium, label: 'Medium', checked: false, color: 'bg-yellow-500' },
    { id: '' + TaskPriority.Low, label: 'Low', checked: false, color: 'bg-green-500' }
  ];

  sprints: FilterOption[] = [
    { id: 'sprint33', label: 'Sprint 33', checked: false, status: 'Active' },
    { id: 'sprint34', label: 'Sprint 34', checked: false, status: 'Active' },
    { id: 'sprint32', label: 'Sprint 32', checked: false, status: 'Completed' },
    { id: 'sprint35', label: 'Sprint 35', checked: false, status: 'Planned' }
  ];



  onFilterChange(filterType: string, option: FilterOption) {
    const currentFilters = this.getCurrentFilters();
  }

  clearAllFilters() {
    this.workTypes.forEach(item => item.checked = false);
    this.priorities.forEach(item => item.checked = false);
    this.sprints.forEach(item => item.checked = false);

    this.filtersChanged.emit({
      type: 'clear',
      allFilters: this.getCurrentFilters()
    });
  }

  applyFilters() {
    const currentFilters = this.getCurrentFilters();
    this.filtersApplied.emit(currentFilters);
  }

  private getCurrentFilters(): ITaskFilters {
    return {
      types: this.workTypes
        .filter(item => item.checked)
        .map(item => +item.id) as TaskType[],
      priorities: this.priorities
        .filter(item => item.checked)
        .map(item => +item.id) as TaskPriority[],
      statuses: this.sprints
        .filter(item => item.checked)
        .map(item => +item.id) as WorkItemStatus[],
      assignedUserId: '',
      search: ''
    };
  }

  getActiveFilterCount(): number {
    const filters = this.getCurrentFilters();
    return filters.types.length +
      filters.priorities.length +
      filters.statuses.length;
  }
}