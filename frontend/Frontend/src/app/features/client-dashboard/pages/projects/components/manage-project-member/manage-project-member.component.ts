import { Component } from '@angular/core';

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  permissions: string[];
  joinDate: Date;
  lastActive: Date;
  status: 'active' | 'inactive' | 'pending';
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

@Component({
  selector: 'app-manage-project-member',
  imports: [],
  templateUrl: './manage-project-member.component.html',
  styleUrl: './manage-project-member.component.css'
})
export class ManageProjectMemberComponent {
  members: ProjectMember[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      avatar: 'JS',
      role: 'Project Lead',
      permissions: ['admin', 'create', 'edit', 'delete', 'assign'],
      joinDate: new Date('2024-01-15'),
      lastActive: new Date('2024-07-22'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      avatar: 'SJ',
      role: 'Developer',
      permissions: ['create', 'edit', 'comment'],
      joinDate: new Date('2024-02-10'),
      lastActive: new Date('2024-07-23'),
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      avatar: 'MW',
      role: 'QA Tester',
      permissions: ['view', 'comment', 'test'],
      joinDate: new Date('2024-03-05'),
      lastActive: new Date('2024-07-20'),
      status: 'active'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      avatar: 'ED',
      role: 'Designer',
      permissions: ['view', 'comment', 'design'],
      joinDate: new Date('2024-04-12'),
      lastActive: new Date('2024-07-19'),
      status: 'pending'
    }
  ];

  roles: Role[] = [
    {
      id: '1',
      name: 'Project Lead',
      permissions: ['admin', 'create', 'edit', 'delete', 'assign'],
      description: 'Full project management access'
    },
    {
      id: '2',
      name: 'Developer',
      permissions: ['create', 'edit', 'comment'],
      description: 'Development and code access'
    },
    {
      id: '3',
      name: 'QA Tester',
      permissions: ['view', 'comment', 'test'],
      description: 'Testing and quality assurance'
    },
    {
      id: '4',
      name: 'Designer',
      permissions: ['view', 'comment', 'design'],
      description: 'Design and UI/UX access'
    },
    {
      id: '5',
      name: 'Viewer',
      permissions: ['view'],
      description: 'Read-only access'
    }
  ];
}
