import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats: any[] = [
    { title: 'Total Project', value: 7, change: 2, changeType: 'increase' },
    { title: 'Total Tasks', value: 49, change: 4, changeType: 'increase' },
    { title: 'Assigned Tasks', value: 12, change: 3, changeType: 'decrease' },
    { title: 'Completed Tasks', value: 6, change: 1, changeType: 'increase' },
    { title: 'Overdue Tasks', value: 3, change: 4, changeType: 'increase' }
  ];
  noteContent = '';

  formatTools = [
    {
      title: 'Bold',
      path: 'M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z'
    },
    {
      title: 'Italic',
      path: 'M19 4h-9m4 0L10 20M5 20h9m-4 0'
    },
    {
      title: 'Underline',
      path: 'M6 4v7a6 6 0 0012 0V4M4 20h16'
    },
    {
      title: 'Strikethrough',
      path: 'M6 4v7a6 6 0 0012 0V4M4 12h16M6 20h4M14 20h4'
    },
    {
      title: 'Bullet List',
      path: 'M4 6h16M4 12h16M4 18h16'
    },
    {
      title: 'Numbered List',
      path: 'M4 6h16M4 12h16M4 18h16'
    }
  ];
projects: any[] = [
  {
    id: 1,
    name: 'Yellow Branding',
    taskCount: 1,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#3B82F6',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png'
  },
  {
    id: 2,
    name: 'Futurework',
    taskCount: 7,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#8B5CF6',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png'
  },
  {
    id: 3,
    name: 'Mogo Web Design',
    status: 'no task',
    color: 'text-white',
    bgColor: '#F59E0B',
    initials: 'M',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'
  },
  {
    id: 4,
    name: 'Hajime Illustration',
    taskCount: 3,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#10B981',
    initials: 'H',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3004/3004065.png'
  },
  {
    id: 5,
    name: 'Resto Dashboard',
    taskCount: 4,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#EC4899',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2620/2620541.png'
  },
  {
    id: 6,
    name: 'The Run Branding',
    taskCount: 4,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#059669',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/174/174883.png'
  },
  {
    id: 7,
    name: 'Carl UI/UX',
    taskCount: 3,
    status: 'due soon',
    color: 'text-white',
    bgColor: '#DC2626',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/888/888879.png'
  }
];

  people: any[] = [
    {
      id: 1,
      name: 'Marc Atenson',
      email: 'marcine@gmail.com',
      initials: 'MA',
      bgColor: '#8B5CF6'
    },
    {
      id: 2,
      name: 'Susan Drake',
      email: 'contact@susanarak...',
      initials: 'SD',
      bgColor: '#06B6D4'
    },
    {
      id: 3,
      name: 'Ronald Richards',
      email: 'ronaldrichard@gmai...',
      initials: 'RR',
      bgColor: '#F59E0B'
    },
    {
      id: 4,
      name: 'Jane Cooper',
      email: 'janecooper@proton...',
      initials: 'JC',
      bgColor: '#EC4899'
    },
    {
      id: 5,
      name: 'Ian Warren',
      email: 'wadewarren@gmail.co',
      initials: 'IW',
      bgColor: '#10B981'
    },
    {
      id: 6,
      name: 'Darrell Steward',
      email: 'darrellsteward@gma...',
      initials: 'DS',
      bgColor: '#6B7280'
    }
  ];
  tasks: any[] = [
    {
      id: 1,
      title: 'Web Mockup',
      project: 'Yellow Branding',
      dueDate: ' in 20 hours',
      urgent: true
    },
    {
      id: 2,
      title: 'Carl Landing Page',
      project: 'Carl UI/UX',
      dueDate: 'in 3 days'
    },
    {
      id: 3,
      title: 'POS UI/UX',
      project: 'Resto Dashboard',
      dueDate: ' in 1 week'
    }
  ];
}
