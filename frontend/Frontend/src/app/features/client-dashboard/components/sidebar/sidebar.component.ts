import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule,RouterModule, CommonModule],
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
  
}
