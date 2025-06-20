import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Level } from '../../../../core/interfaces/ICourse';

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent implements OnInit, OnChanges {
  @Input() level!: Level;
  @Input() numberLevel!: string;
  @Input() levelName!: string;

  ngOnInit() {
    this.initializeModules();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['level'] && !changes['level'].firstChange) {
      this.initializeModules();
    }
  }

  toggleModule(selectedModule: any) {
    if (this.level?.module) {
      this.level.module = this.level.module.map(module => ({
        ...module,
        isExpanded: module === selectedModule ? true : true
      }));
    }
  }

  private initializeModules() {
    if (this.level?.module) {
      this.level.module = this.level.module.map((module: any) => ({
        ...module,
        isExpanded: true
      }));
    }
  }
}
