import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProjectListComponent } from "../project-list/project-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule, CommonModule, ProjectListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input({ required: true }) menuItems!: any[];
  items: any[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/dashboard']
    },
    {
      label: 'PLANNING',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Appointments',
          icon: 'pi pi-calendar-plus',
          routerLink: ['/appointments']
        },
        {
          label: 'Schedule',
          icon: 'pi pi-clock',
          routerLink: ['/schedule']
        },
        {
          label: 'Tasks',
          icon: 'pi pi-check-square',
          routerLink: ['/tasks']
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-line',
      routerLink: ['/reports']
    }
  ];
  projectList = [
    { name: 'Website Redesign', color: 'bg-blue-500', initial: 'W' },
    { name: 'Mobile App', color: 'bg-green-500', initial: 'M' },
    { name: 'API Development', color: 'bg-purple-500', initial: 'A' },
    { name: 'Database Migration', color: 'bg-orange-500', initial: 'D' },
    { name: 'UI Components', color: 'bg-red-500', initial: 'U' }
  ];
}
