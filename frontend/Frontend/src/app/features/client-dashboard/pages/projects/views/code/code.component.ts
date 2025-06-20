import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-code',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Repository Info -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-[#172B4D]">Repository Overview</h2>
              <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-[#42526E] hover:bg-[#F4F5F7] rounded-sm">
                <i class='bx bx-git-branch'></i>
                <span>main</span>
              </button>
            </div>

            <!-- Branch Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="p-3 bg-[#F4F5F7] rounded">
                <div class="text-sm text-[#42526E] mb-1">Branches</div>
                <div class="text-lg font-medium text-[#172B4D]">5</div>
              </div>
              <div class="p-3 bg-[#F4F5F7] rounded">
                <div class="text-sm text-[#42526E] mb-1">Pull Requests</div>
                <div class="text-lg font-medium text-[#172B4D]">3</div>
              </div>
              <div class="p-3 bg-[#F4F5F7] rounded">
                <div class="text-sm text-[#42526E] mb-1">Contributors</div>
                <div class="text-lg font-medium text-[#172B4D]">8</div>
              </div>
            </div>

            <!-- Recent Commits -->
            <div>
              <h3 class="text-sm font-medium text-[#42526E] mb-3">Recent Commits</h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-3 hover:bg-[#F4F5F7] rounded cursor-pointer">
                  <div class="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-sm">JD</div>
                  <div>
                    <p class="text-[#172B4D] font-medium">Update project documentation</p>
                    <div class="flex items-center gap-2 text-sm text-[#42526E]">
                      <span>main</span>
                      <span>·</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 hover:bg-[#F4F5F7] rounded cursor-pointer">
                  <div class="w-8 h-8 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-sm">AS</div>
                  <div>
                    <p class="text-[#172B4D] font-medium">Fix responsive layout issues</p>
                    <div class="flex items-center gap-2 text-sm text-[#42526E]">
                      <span>feature/responsive-fix</span>
                      <span>·</span>
                      <span>5 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="bg-white rounded-lg shadow p-4">
          <h2 class="text-lg font-medium text-[#172B4D] mb-4">Activity Feed</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#0052CC] flex items-center justify-center text-white text-sm">JD</div>
              <div>
                <p class="text-[#172B4D]">John Doe merged pull request <span class="text-[#0052CC]">#123</span></p>
                <span class="text-sm text-[#42526E]">2 hours ago</span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#FF5630] flex items-center justify-center text-white text-sm">AS</div>
              <div>
                <p class="text-[#172B4D]">Alice Smith opened issue <span class="text-[#0052CC]">#456</span></p>
                <span class="text-sm text-[#42526E]">5 hours ago</span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[#36B37E] flex items-center justify-center text-white text-sm">RK</div>
              <div>
                <p class="text-[#172B4D]">Robert Kim created branch <span class="text-[#0052CC]">feature/api-integration</span></p>
                <span class="text-sm text-[#42526E]">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CodeComponent { }