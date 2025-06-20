import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-4">
      <div class="bg-white rounded-lg shadow">
        <!-- Calendar Header -->
        <div class="flex items-center justify-between p-4 border-b border-[#DFE1E6]">
          <div class="flex items-center gap-4">
            <h2 class="text-lg font-medium text-[#172B4D]">January 2024</h2>
            <div class="flex items-center gap-2">
              <button class="p-1 hover:bg-[#F4F5F7] rounded">
                <i class='bx bx-chevron-left text-xl text-[#42526E]'></i>
              </button>
              <button class="p-1 hover:bg-[#F4F5F7] rounded">
                <i class='bx bx-chevron-right text-xl text-[#42526E]'></i>
              </button>
            </div>
          </div>
          <button class="px-3 py-1 text-sm text-[#42526E] hover:bg-[#F4F5F7] rounded">Today</button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 text-center border-b border-[#DFE1E6]">
          <div class="py-2 text-sm font-medium text-[#42526E]">Sun</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Mon</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Tue</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Wed</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Thu</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Fri</div>
          <div class="py-2 text-sm font-medium text-[#42526E]">Sat</div>
        </div>

        <div class="grid grid-cols-7 text-sm">
          <!-- Previous Month -->
          <div *ngFor="let day of [31]" class="p-2 border-b border-r border-[#DFE1E6] min-h-[100px] text-[#A5ADBA]">
            {{ day }}
          </div>

          <!-- Current Month -->
          <div *ngFor="let day of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]"
            class="p-2 border-b border-r border-[#DFE1E6] min-h-[100px]">
            <div class="flex justify-between items-start">
              <span class="text-[#172B4D]">{{ day }}</span>
              <button *ngIf="day === 15" class="text-xs px-1.5 py-0.5 bg-[#0052CC] text-white rounded">2</button>
            </div>
            <!-- Example Event -->
            <div *ngIf="day === 15" class="mt-2">
              <div class="text-xs p-1 bg-[#E3F2FD] text-[#0052CC] rounded mb-1">Design Review</div>
              <div class="text-xs p-1 bg-[#FFF4E5] text-[#FF8B00] rounded">Team Meeting</div>
            </div>
          </div>

          <!-- Next Month -->
          <div *ngFor="let day of [1,2,3]" class="p-2 border-b border-r border-[#DFE1E6] min-h-[100px] text-[#A5ADBA]">
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent { }