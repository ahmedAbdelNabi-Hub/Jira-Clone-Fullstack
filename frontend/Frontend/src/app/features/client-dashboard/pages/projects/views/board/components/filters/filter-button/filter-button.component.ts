import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FilterSectionComponent } from "../filter-section/filter-section.component";
import { ITaskFilters } from '../../../../../../../../../core/interfaces/ITaskFilters';

@Component({
  selector: 'app-filter-button',
  imports: [CommonModule, FilterSectionComponent],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent {
  @ViewChild('dropdownContainer', { static: false }) dropdownContainer!: ElementRef;
  @Output() filtersChanged = new EventEmitter<ITaskFilters>();

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onFiltersApplied($event: ITaskFilters) {
    this.filtersChanged.emit($event); 
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
