import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSummary } from '../../../../core/interfaces/ICourse';


@Component({
  selector: 'app-ai-chat-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-chat-plan.component.html',
  styleUrls: ['./ai-chat-plan.component.css']
})
export class AiChatPlanComponent {
  @Input("courseSummary") courseSummary: CourseSummary | null = null;

}
