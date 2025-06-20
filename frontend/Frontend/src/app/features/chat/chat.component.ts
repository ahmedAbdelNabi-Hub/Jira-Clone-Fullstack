import { Component } from '@angular/core';
import { SidebarChatComponent } from "./components/sidebar-chat/sidebar-chat.component";
import { ChatMessageComponent } from "./components/chat-message/chat-message.component";
import { ChatMediaComponent } from "./components/chat-media/chat-media.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SidebarChatComponent, ChatMessageComponent, ChatMediaComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor() {
    console.log("ChatComponent initialized");
  }
}
