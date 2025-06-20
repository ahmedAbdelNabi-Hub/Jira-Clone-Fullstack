import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/AuthService.service';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  activeMenu: string | null = null;
  activeTab: string = 'board';

  tabs: TabConfig[] = [
    { id: 'summary', label: 'Summary', icon: 'bx bx-world', route: 'summary' },
    { id: 'Backlog', label: 'Backlog', icon: 'bx bx-columns bx-rotate-270', route: 'Backlog' },
    { id: 'timeline', label: 'Timeline', icon: 'bx-time', route: 'timeline' },
    { id: 'board', label: 'Board', icon: 'bx-layout', route: 'board' },
    { id: 'calendar', label: 'Calendar', icon: 'bx-calendar', route: 'calendar' },
    { id: 'list', label: 'List', icon: 'bx-list-ul', route: 'list' },
    { id: 'code', label: 'Code', icon: 'bx-code-alt', route: 'code' }
  ];


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private auth: AuthService) { }


  selectTab(tab: string) {
    this.activeTab = tab;
  }

  toggleMenu(event: Event, menuId: string) {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === menuId ? null : menuId;
  }

  handleMenuAction(action: string, tab: string) {
    console.log(`${action} action for ${tab} tab`);
    this.closeMenu();
  }

  closeMenu() {
    this.activeMenu = null;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', () => this.closeMenu());
    }
  }
}
