import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../../../../../core/interfaces/IMenuItem';
import { ClickOutsideDirective } from '../../../../../../shared/directives/ClickOutside.directive';

@Component({
  selector: 'app-backlog',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent implements OnInit {
  isOpen = true;
  isCreate = false;
  isDropdownOpen = false;

  items: IMenuItem[] = [
    {
      label: 'Task',
      icon: 'bx-task',
      isOpen: false
    },
    {
      label: 'Bug',
      icon: 'bx-bug-alt',
      isOpen: false
    },
    {
      label: 'Story',
      icon: 'bx-book-open',
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit() { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.items.forEach(item => item.isOpen = false);
    }
  }

  toggleSubMenu(item: IMenuItem) {
    this.items.forEach(i => {
      if (i !== item) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }
}