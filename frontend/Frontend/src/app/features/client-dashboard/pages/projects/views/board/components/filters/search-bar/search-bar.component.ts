import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search';
  @Output() searchChange = new EventEmitter<string>();

  onInputChange(event: any) {
    this.searchChange.emit(event.target.value);
  }
}
