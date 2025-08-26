// user-assignment-dropdown.component.ts
import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMember } from '../../../../../../../core/interfaces/IMember';

@Component({
  selector: 'app-user-assignment-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full">
      <div 
        #dropdownTrigger
        (click)="toggleDropdown()"
        class="w-full min-h-[45px] px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
      <div class="flex flex-wrap gap-2" *ngIf="selectedUsers.length > 0">
          <div 
            *ngFor="let user of selectedUsers; trackBy: trackByUserId"
            class="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            <img 
              [src]="user.image || 'https://ui-avatars.com/api/?name=' + user.fullName + '&background=e5e7eb&color=6b7280&size=128'" 
              [alt]="user.fullName"
              class="w-5 h-5 rounded-full mr-2"
              (error)="onImageError($event)">
            <span>{{ user.fullName }}</span>
            <button 
              type="button"
              (click)="removeUser($event, user)"
              class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
              <i class="bx bx-x text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Placeholder when no users selected -->
        <div 
          *ngIf="selectedUsers.length === 0"
          class="text-gray-500 text-sm py-1">
          {{ placeholder }}
        </div>
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <i class="bx" [class.bx-chevron-down]="!isOpen" [class.bx-chevron-up]="isOpen" 
             class="text-gray-400 transition-transform duration-200"></i>
        </div>
      </div>

      <div 
        *ngIf="isOpen"
        class="absolute z-50  w-full mt-1 mb-8 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
                <div class="p-3 border-b border-gray-200">
          <div class="relative">
            <i class="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              #searchInput
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearchChange()"
              placeholder="Search users..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>

        <!-- Users List -->
        <div class="max-h-60  overflow-y-auto">
          <div 
            *ngFor="let user of filteredUsers; trackBy: trackByUserId"
            (click)="toggleUserSelection(user)"
            class="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            [class.bg-blue-50]="isUserSelected(user.userId)">
            
            <!-- User Avatar -->
            <img 
              [src]="user.image || 'https://ui-avatars.com/api/?name=' + user.fullName + '&background=e5e7eb&color=6b7280&size=128'" 
              [alt]="user.fullName"
              class="w-8 h-8 rounded-full mr-3 flex-shrink-0"
              (error)="onImageError($event)">
            
            <!-- User Info -->
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">
                {{ user.fullName }}
              </div>
              <div 
                *ngIf="user.email"
                class="text-xs text-gray-500 truncate">
                {{ user.email }}
              </div>
            </div>

            <!-- Selection Indicator -->
            <div class="flex-shrink-0 ml-2">
              <i 
                class="bx text-lg transition-colors duration-150"
                [class.bx-check-circle]="isUserSelected(user.userId)"
                [class.bx-circle]="!isUserSelected(user.userId)"
                [class.text-blue-600]="isUserSelected(user.userId)"
                [class.text-gray-300]="!isUserSelected(user.userId)"></i>
            </div>
          </div>

          <!-- No Results Message -->
          <div 
            *ngIf="filteredUsers.length === 0 && searchTerm"
            class="px-3 py-6 text-center text-gray-500 text-sm">
            <i class="bx bx-search-alt text-2xl mb-2 block text-gray-300"></i>
            No users found matching "{{ searchTerm }}"
          </div>

          <!-- Empty State -->
          <div 
            *ngIf="availableUsers.length === 0"
            class="px-3 py-6 text-center text-gray-500 text-sm">
            <i class="bx bx-user text-2xl mb-2 block text-gray-300"></i>
            No users available
          </div>
        </div>

        <!-- Selected Count Footer -->
        <div 
          *ngIf="selectedUsers.length > 0"
          class="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
          {{ selectedUsers.length }} user{{ selectedUsers.length === 1 ? '' : 's' }} selected
        </div>
      </div>
    </div>
  `,
})
export class UserAssignmentDropdownComponent implements OnInit {
  @Input() availableUsers: IMember[] = [];
  @Input() selectedUserIds: string[] = [];
  @Input() placeholder: string = 'Select users to assign';
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<string[]>();

  @ViewChild('dropdownTrigger', { static: false }) dropdownTrigger!: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  isOpen = false;
  searchTerm = '';
  selectedUsers: IMember[] = [];
  filteredUsers: IMember[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.updateSelectedUsers();
    this.updateFilteredUsers();
  }

  ngOnChanges(): void {
    this.updateSelectedUsers();
    this.updateFilteredUsers();
  }

  toggleDropdown(): void {
    if (this.disabled) return;

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Focus search input after dropdown opens
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      }, 100);
    } else {
      this.searchTerm = '';
      this.updateFilteredUsers();
    }
  }

  toggleUserSelection(user: IMember): void {
    const isSelected = this.isUserSelected(user.userId);

    if (isSelected) {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.userId);
    } else {
      this.selectedUserIds = [...this.selectedUserIds, user.userId];
    }

    this.updateSelectedUsers();
    this.emitSelectionChange();
  }

  removeUser(event: Event, user: IMember): void {
    event.stopPropagation();
    this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.userId);
    this.updateSelectedUsers();
    this.emitSelectionChange();
  }

  isUserSelected(userId: string): boolean {
    return this.selectedUserIds.includes(userId);
  }

  onSearchChange(): void {
    this.updateFilteredUsers();
  }

  private updateSelectedUsers(): void {
    this.selectedUsers = this.availableUsers.filter(user =>
      this.selectedUserIds.includes(user.userId)
    );
  }

  private updateFilteredUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.availableUsers];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredUsers = this.availableUsers.filter(user =>
        user.fullName.toLowerCase().includes(term) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    }
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit([...this.selectedUserIds]);
  }

  trackByUserId(index: number, user: IMember): string {
    return user.userId;
  }

  onImageError(event: any): void {
    // Fallback to a default avatar if image fails to load
    event.target.src = 'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(event.target.alt || 'User') +
      '&background=e5e7eb&color=6b7280&size=128';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.searchTerm = '';
      this.updateFilteredUsers();
    }
  }
}