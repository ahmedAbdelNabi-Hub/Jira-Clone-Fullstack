import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-[#172B4D] mb-4">Project Details</h3>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-[#42526E] block mb-1">Project Lead</label>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-sm">JD</div>
                <span class="text-[#172B4D]">John Doe</span>
              </div>
            </div>
            <div>
              <label class="text-sm text-[#42526E] block mb-1">Start Date</label>
              <span class="text-[#172B4D]">Jan 1, 2024</span>
            </div>
            <div>
              <label class="text-sm text-[#42526E] block mb-1">Due Date</label>
              <span class="text-[#172B4D]">Mar 31, 2024</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-[#172B4D] mb-4">Progress Overview</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm text-[#42526E]">Tasks Completed</span>
                <span class="text-sm text-[#42526E]">65%</span>
              </div>
              <div class="w-full bg-[#DFE1E6] rounded-full h-2">
                <div class="bg-[#0052CC] h-2 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-[#42526E] block mb-1">Total Tasks</label>
                <span class="text-[#172B4D] text-lg font-medium">24</span>
              </div>
              <div>
                <label class="text-sm text-[#42526E] block mb-1">Days Remaining</label>
                <span class="text-[#172B4D] text-lg font-medium">45</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-[#172B4D] mb-4">Team Members</h3>
          <div class="flex flex-wrap gap-2">
            <div class="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-sm">JD</div>
            <div class="w-8 h-8 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-sm">AS</div>
            <div class="w-8 h-8 rounded-full bg-[#36B37E] flex items-center justify-center text-white text-sm">RK</div>
            <div class="w-8 h-8 rounded-full bg-[#6554C0] flex items-center justify-center text-white text-sm">ML</div>
            <div class="w-8 h-8 rounded-full bg-[#00B8D9] flex items-center justify-center text-white text-sm">PJ</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-[#172B4D] mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-sm">JD</div>
              <div>
                <p class="text-[#172B4D]">John Doe added a new task</p>
                <span class="text-sm text-[#42526E]">2 hours ago</span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-sm">AS</div>
              <div>
                <p class="text-[#172B4D]">Alice Smith completed Task-123</p>
                <span class="text-sm text-[#42526E]">5 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SummaryComponent { }