import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-4">
      <div class="bg-white rounded-lg shadow">
        <!-- List Header -->
        <div class="flex items-center justify-between p-4 border-b border-[#DFE1E6]">
          <div class="flex items-center gap-4">
            <h2 class="text-lg font-medium text-[#172B4D]">All Tasks</h2>
            <span class="text-sm text-[#42526E]">24 tasks</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-[#42526E] hover:bg-[#F4F5F7] rounded-sm">
              <i class='bx bx-filter-alt'></i>
              <span>Filter</span>
            </button>
            <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-[#42526E] hover:bg-[#F4F5F7] rounded-sm">
              <i class='bx bx-sort'></i>
              <span>Sort</span>
            </button>
          </div>
        </div>

        <!-- List Items -->
        <div class="divide-y divide-[#DFE1E6]">
          <!-- High Priority Tasks -->
          <div class="p-4">
            <h3 class="text-sm font-medium text-[#42526E] mb-4">High Priority</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2 hover:bg-[#F4F5F7] rounded px-2 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="text-[#172B4D]">Design system implementation</span>
                  <span class="px-2 py-0.5 text-xs bg-[#FF5630] text-white rounded">High</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-xs">JD</div>
                    <div class="w-6 h-6 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-xs">AS</div>
                  </div>
                  <span class="text-sm text-[#42526E]">Jan 15</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Medium Priority Tasks -->
          <div class="p-4">
            <h3 class="text-sm font-medium text-[#42526E] mb-4">Medium Priority</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2 hover:bg-[#F4F5F7] rounded px-2 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="text-[#172B4D]">Update documentation</span>
                  <span class="px-2 py-0.5 text-xs bg-[#FF8B00] text-white rounded">Medium</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full bg-[#36B37E] flex items-center justify-center text-white text-xs">RK</div>
                  </div>
                  <span class="text-sm text-[#42526E]">Jan 20</span>
                </div>
              </div>
              <div class="flex items-center justify-between py-2 hover:bg-[#F4F5F7] rounded px-2 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="text-[#172B4D]">Review pull requests</span>
                  <span class="px-2 py-0.5 text-xs bg-[#FF8B00] text-white rounded">Medium</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-xs">JD</div>
                  </div>
                  <span class="text-sm text-[#42526E]">Jan 22</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Low Priority Tasks -->
          <div class="p-4">
            <h3 class="text-sm font-medium text-[#42526E] mb-4">Low Priority</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2 hover:bg-[#F4F5F7] rounded px-2 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="checkbox" class="rounded border-gray-300" checked>
                  <span class="text-[#42526E] line-through">Setup development environment</span>
                  <span class="px-2 py-0.5 text-xs bg-[#36B37E] text-white rounded">Low</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-xs">AS</div>
                  </div>
                  <span class="text-sm text-[#42526E]">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListComponent { }