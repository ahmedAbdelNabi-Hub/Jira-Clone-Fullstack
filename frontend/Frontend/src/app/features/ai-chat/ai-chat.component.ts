import { Component, signal } from '@angular/core';

import { SidebarAiChatComponent } from "./components/sidebar-ai-chat/sidebar-ai-chat.component";
import { AiChatMessageComponent } from "./components/ai-chat-message/ai-chat-message.component";
import { AiChatPlanComponent } from "./components/ai-chat-plan/ai-chat-plan.component";
import { AiChatHeaderComponent } from "./components/ai-chat-header/ai-chat-header.component";
import { CourseSummary } from '../../core/interfaces/ICourse';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, AiChatHeaderComponent, SidebarAiChatComponent, AiChatMessageComponent, AiChatPlanComponent],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css'],
})
export class AiChatComponent {

  isSidebarOpen = signal<boolean>(false);
  courseSummary = signal<CourseSummary | null>(null);

// In your component
readonly courseSummaryValue = this.courseSummary.asReadonly();


  toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  handelSidebar(isOpen: boolean): void {
    this.isSidebarOpen.set(isOpen);
  }

  handelSummaryData(summary: CourseSummary): void {
    this.courseSummary.set(summary);
  }
  get isSidebarVisible() {
    return !this.isSidebarOpen();
  }

}
