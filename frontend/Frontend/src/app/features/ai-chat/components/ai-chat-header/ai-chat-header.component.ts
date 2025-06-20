import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-chat-header',
  imports: [],
  templateUrl: './ai-chat-header.component.html',
  styleUrl: './ai-chat-header.component.css'
})
export class AiChatHeaderComponent {
  toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
