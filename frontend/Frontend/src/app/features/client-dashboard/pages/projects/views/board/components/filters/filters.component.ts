import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ITaskFilters } from '../../../../../../../../core/interfaces/ITaskFilters';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { UserAvatarComponent } from "./user-avatar/user-avatar.component";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [SearchBarComponent, FilterButtonComponent, UserAvatarComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnDestroy {
  @Output() filtersChanged = new EventEmitter<ITaskFilters>();

  filters: ITaskFilters = {
    statuses: [],
    priorities: [],
    types: [],
    assignedUserId: '',
    search: ''
  };

  private filtersSubject = new Subject<ITaskFilters>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.filtersSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(filters => this.filtersChanged.emit(filters));
  }

  onSearchChange(search: string) {
    this.filters = { ...this.filters, search };
    this.filtersSubject.next(this.filters);
  }

  onUserIdChange(id: string) {
    this.filters = { ...this.filters, assignedUserId: id };
    this.filtersSubject.next(this.filters);
  }

  onFiltersChanged(filters: ITaskFilters) {
    this.filters = { ...filters };
    this.filtersSubject.next(filters);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
