import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon?: string;
  items?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule]
})
export class TimelineComponent implements OnInit {
  isOpen = false;
  isDropdownOpen = false;

  items: MenuItem[] = [
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

  toggleSubMenu(item: MenuItem) {
    this.items.forEach(i => {
      if (i !== item) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }
}