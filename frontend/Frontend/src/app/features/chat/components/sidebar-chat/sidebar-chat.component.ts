import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-chat.component.html',
  styleUrl: './sidebar-chat.component.css'
})
export class SidebarChatComponent {
  users: any[] = [
    { avatar: 'https://randomuser.me/api/portraits/men/1.jpg', count: 0, name: 'John Doe', message: 'Reminder that we have a project meeting at 3 PM today!', time: '3:21 PM' },
    { avatar: 'https://randomuser.me/api/portraits/women/2.jpg', count: 0, name: 'Alice Johnson', message: 'Don’t forget to submit the report by 5 PM.', time: '2:15 PM' },
    { avatar: 'https://randomuser.me/api/portraits/men/3.jpg', count: 5, name: 'Bob Smith', message: 'Can we reschedule the 2 PM meeting?', time: '1:45 PM' },
    { avatar: 'https://randomuser.me/api/portraits/women/4.jpg', count: 0, name: 'Jane Foster', message: 'Meeting rescheduled to 4 PM today.', time: '12:30 PM' },
    { avatar: 'https://randomuser.me/api/portraits/men/5.jpg', count: 5, name: 'Chris Evans', message: 'Please review the latest draft before the meeting.', time: '11:20 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/7.jpg', count: 0, name: 'Michael Scott', message: 'The new project details are available in the folder.', time: '9:10 AM' },
    { avatar: 'https://randomuser.me/api/portraits/women/8.jpg', count: 300, name: 'Rachel Green', message: 'Remember to bring the presentation slides to the meeting.', time: '8:30 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/9.jpg', count: 0, name: 'David Tennant', message: 'Let’s discuss the budget for the next quarter.', time: '7:50 AM' },
    { avatar: 'https://randomuser.me/api/portraits/women/10.jpg', count: 0, name: 'Scarlett Johansson', message: 'Have you checked the latest feedback from the client?', time: '6:30 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/11.jpg', count: 8, name: 'Tom Hiddleston', message: 'Can you send me the updated proposal?', time: '5:00 AM' },
    { avatar: 'https://randomuser.me/api/portraits/women/12.jpg', count: 0, name: 'Natalie Portman', message: 'The schedule has been updated, check the email.', time: '4:15 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/13.jpg', count: 0, name: 'Ryan Gosling', message: 'Good morning! Ready for today’s presentation?', time: '3:30 AM' },
    { avatar: 'https://randomuser.me/api/portraits/women/14.jpg', count: 0, name: 'Jennifer Lawrence', message: 'Let’s have a quick call at 2 PM to finalize details.', time: '2:45 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/15.jpg', count: 0, name: 'Chris Hemsworth', message: 'Check the latest figures in the shared folder.', time: '1:20 AM' },
    { avatar: 'https://randomuser.me/api/portraits/women/16.jpg', count: 0, name: 'Gwyneth Paltrow', message: 'We need to discuss the marketing strategy for next month.', time: '12:10 AM' },
    { avatar: 'https://randomuser.me/api/portraits/men/17.jpg', count: 0, name: 'Robert Downey Jr.', message: 'Have you reviewed the client feedback for the project?', time: '11:50 PM' },
    { avatar: 'https://randomuser.me/api/portraits/women/18.jpg', count: 0, name: 'Kylie Jenner', message: 'Reminder: the team meeting is at 9 AM tomorrow.', time: '10:00 PM' },
    { avatar: 'https://randomuser.me/api/portraits/men/19.jpg', count: 0, name: 'Mark Ruffalo', message: 'Please find the attached report for this week.', time: '9:15 PM' },
    { avatar: 'https://randomuser.me/api/portraits/women/20.jpg', count: 0, name: 'Zendaya', message: 'Quick reminder: We have a call at 11 AM tomorrow.', time: '8:30 PM' },
  ];
}
