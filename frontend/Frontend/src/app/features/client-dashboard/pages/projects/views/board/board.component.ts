import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
interface TaskAssignee {
  name: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'review' | 'done';
  image?: string;
  dueDate?: Date;
  comments?: number;
  assignees?: TaskAssignee[];
  isBeingDragged?: boolean;
  isNewTask?: boolean;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, TaskFormComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  reviewTasks: Task[] = [];
  doneTasks: Task[] = [];
  draggedTask: Task | null = null;
  darkMode: boolean = false;
  dragOverColumn: string | null = null;
  nextTaskId: number = 8;
  visible: boolean = false;
  position: 'left' | 'right' | 'top' | 'bottom' | 'center' = 'right';

  showDialog(pos: 'left' | 'right' | 'top' | 'bottom' | 'center') {
    this.position = pos;
    this.visible = true;
  }
  constructor() { }

  ngOnInit() {
    this.todoTasks = [
      {
        id: 1,
        title: 'Implement Authentication',
        description: 'Add user login and registration functionality',
        priority: 'high',
        status: 'todo',
        dueDate: new Date('2024-03-15'),
        comments: 5,
        assignees: [
          { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=facearea&w=100&h=100' },
          { name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?fit=facearea&w=100&h=100' }
        ]
      },
      {
        id: 2,
        title: 'Design Dashboard',
        description: 'Create wireframes for main dashboard',
        priority: 'medium',
        status: 'todo',
        dueDate: new Date('2024-03-20'),
        comments: 3,
        assignees: [
          { name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=facearea&w=100&h=100' }
        ]
      },
      {
        id: 5,
        title: 'Create User Profile',
        description: 'Implement user profile page with edit capabilities',
        priority: 'medium',
        status: 'todo',
        dueDate: new Date('2024-03-25'),
        comments: 2,
        assignees: [
          { name: 'Bob Wilson', avatar: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?fit=facearea&w=100&h=100' }
        ]
      },
      {
        id: 6,
        title: 'Add Search Functionality',
        description: 'Implement search feature across all tasks',
        priority: 'low',
        status: 'todo',
        dueDate: new Date('2024-03-30'),
        comments: 1,
        assignees: []
      },
      {
        id: 7,
        title: 'Implement Notifications',
        description: 'Add real-time notifications for task updates',
        priority: 'high',
        status: 'todo',
        dueDate: new Date('2024-04-05'),
        comments: 4,
        assignees: [
          { name: 'Charlie Brown', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=facearea&w=100&h=100' }
        ]
      }
    ];

    this.inProgressTasks = [
      {
        id: 3,
        title: 'API Integration',
        description: 'Connect frontend with backend services',
        priority: 'high',
        status: 'inProgress',
        dueDate: new Date('2024-03-18'),
        comments: 7,
        assignees: [
          { name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=facearea&w=100&h=100' }
        ]
      }
    ];

    this.reviewTasks = [
      {
        id: 3,
        title: 'API Integration',
        description: 'Connect frontend with backend services',
        priority: 'high',
        status: 'inProgress',
        dueDate: new Date('2024-03-18'),
        comments: 7,
        assignees: [
          { name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?fit=facearea&w=100&h=100' }
        ]
      }
    ];

    this.doneTasks = [
      {
        id: 4,
        title: 'Project Setup',
        description: 'Initialize project and install dependencies',
        priority: 'low',
        status: 'done',
        dueDate: new Date('2024-03-10'),
        comments: 2,
        assignees: [
          { name: 'Eva Green', avatar: 'https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?fit=facearea&w=100&h=100' }
        ]
      }
    ];
  }

  onDragStart(event: DragEvent, task: Task) {
    this.draggedTask = task;
    task.isBeingDragged = true;

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', task.id.toString());
    }

    // Add dragging class with slight delay to ensure smooth animation
    setTimeout(() => {
      const element = event.target as HTMLElement;
      element.classList.add('dragging');
    }, 0);
  }

  onDragOver(event: DragEvent) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    return false;
  }

  onDragEnter(event: DragEvent, column: string) {
    event.preventDefault();
    this.dragOverColumn = column;
  }

  onDragLeave(event: DragEvent) {
    // Only clear drag over if we're actually leaving the drop zone
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.dragOverColumn = null;
    }
  }

  onDragEnd(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');

    if (this.draggedTask) {
      this.draggedTask.isBeingDragged = false;
    }

    this.draggedTask = null;
    this.dragOverColumn = null;
  }

  onDrop(event: DragEvent, status: 'todo' | 'inProgress' | 'review' | 'done') {
    if (event.preventDefault) {
      event.preventDefault();
    }

    this.dragOverColumn = null;

    if (!this.draggedTask) return;

    const taskToMove = { ...this.draggedTask };

    // Remove task from its original list
    this.todoTasks = this.todoTasks.filter(task => task.id !== this.draggedTask?.id);
    this.inProgressTasks = this.inProgressTasks.filter(task => task.id !== this.draggedTask?.id);
    this.reviewTasks = this.reviewTasks.filter(task => task.id !== this.draggedTask?.id);
    this.doneTasks = this.doneTasks.filter(task => task.id !== this.draggedTask?.id);

    // Update task status and add animation classes
    taskToMove.status = status;
    taskToMove.isBeingDragged = false;
    taskToMove.isNewTask = true;

    // Add task to new list
    switch (status) {
      case 'todo':
        this.todoTasks.push(taskToMove);
        break;
      case 'inProgress':
        this.inProgressTasks.push(taskToMove);
        break;
      case 'review':
        this.reviewTasks.push(taskToMove);
        break;
      case 'done':
        this.doneTasks.push(taskToMove);
        break;
    }

    // Remove new task animation after animation completes
    setTimeout(() => {
      taskToMove.isNewTask = false;
    }, 500);

    this.draggedTask = null;
  }

  addNewTask() {
    const newTask: Task = {
      id: this.nextTaskId++,
      title: 'New Task',
      description: 'Click to edit this task description',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      comments: 0,
      assignees: [],
      isNewTask: true
    };

    this.todoTasks.unshift(newTask);


  }

  getTotalTasks(): number {
    return this.todoTasks.length + this.inProgressTasks.length + this.reviewTasks.length + this.doneTasks.length;
  }

  getTasksByStatus(status: string): Task[] {
    switch (status) {
      case 'todo': return this.todoTasks;
      case 'inProgress': return this.inProgressTasks;
      case 'review': return this.reviewTasks;
      case 'done': return this.doneTasks;
      default: return [];
    }
  }
}