// comment-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface IComment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

    <div *ngIf="isModalOpen()" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         (click)="closeModal()">
      
      <!-- Modal Content -->
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
           (click)="$event.stopPropagation()">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i class='bx bx-chat text-xl text-blue-600'></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Comments</h2>
              <p class="text-sm text-gray-600">{{comments.length}} comment{{comments.length !== 1 ? 's' : ''}}</p>
            </div>
          </div>
          <button (click)="closeModal()" 
                  class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <i class='bx bx-x text-xl'></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex flex-col h-96">
          <!-- Comments List -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <!-- No Comments State -->
            <div *ngIf="comments.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i class='bx bx-chat text-2xl text-gray-400'></i>
              </div>
              <p class="text-gray-500 mb-2">No comments yet</p>
              <p class="text-sm text-gray-400">Be the first to share your thoughts!</p>
            </div>

            <!-- Comments -->
            <div *ngFor="let comment of comments; trackBy: trackByCommentId" 
                 class="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {{getInitials(comment.author)}}
                </div>
              </div>
              
              <!-- Comment Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-sm font-medium text-gray-900">{{comment.author}}</span>
                  <span class="text-xs text-gray-500">{{formatTimestamp(comment.timestamp)}}</span>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed">{{comment.text}}</p>
              </div>
            </div>
          </div>

          <!-- Add Comment Form -->
          <div class="border-t border-gray-200 p-4 bg-gray-50">
            <form (ngSubmit)="addComment()" #commentForm="ngForm" class="space-y-3">
              <!-- Author Input -->
           

              <!-- Comment Input -->
              <div class="flex space-x-2">
                <div class="flex-1">
                  <textarea 
                    [(ngModel)]="newComment.text"
                    name="comment"
                    required
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none"
                    placeholder="Write a comment..."></textarea>
                </div>
                <button 
                  type="submit" 
                  [disabled]="!commentForm.form.valid || isSaving"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium text-sm h-fit">
                  <i class='bx bx-send' [class.bx-loader-alt]="isSaving" [class.bx-spin]="isSaving"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .bx-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class CommentModalComponent {
  @Input() comments: IComment[] = [];
  @Input() currentUser: string = '';
  @Output() commentAdded = new EventEmitter<IComment>();

  @Input() isModalOpen = signal<boolean>(false);

  isSaving = false;

  newComment = {
    author: '',
    text: ''
  };



  constructor() {
    this.newComment.author = this.currentUser;

  }

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Auto-focus on textarea after modal opens
    setTimeout(() => {
      const textarea = document.querySelector('textarea[name="comment"]') as HTMLTextAreaElement;
      if (textarea) textarea.focus();
    }, 100);
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
    this.resetForm();
  }

  async addComment() {
    if (!this.newComment.author.trim() || !this.newComment.text.trim()) {
      return;
    }
    this.isSaving = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const comment: IComment = {
        id: this.generateId(),
        text: this.newComment.text.trim(),
        author: this.newComment.author.trim(),
        timestamp: new Date()
      };

      this.commentAdded.emit(comment);
      this.resetForm();

    } catch (error) {
      console.error('Failed to save comment:', error);
    } finally {
      this.isSaving = false;
    }
  }

  resetForm() {
    this.newComment = {
      author: this.currentUser,
      text: ''
    };
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return timestamp.toLocaleDateString();
  }

  trackByCommentId(index: number, comment: IComment): string {
    return comment.id;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Parent component example:
/*
// parent.component.ts
export class ParentComponent {
  taskComments: Comment[] = [
    {
      id: '1',
      text: 'This looks great! I have a few suggestions for improvement.',
      author: 'John Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      text: 'Thanks for the feedback. I will implement the changes.',
      author: 'Jane Doe',
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    }
  ];
  
  currentUserName = 'Current User';

  onCommentAdded(comment: Comment) {
    this.taskComments.push(comment);
    console.log('New comment added:', comment);
    // Here you would typically save to your backend
  }
}

// parent.component.html
<app-comment-modal 
  [comments]="taskComments"
  [currentUser]="currentUserName"
  (commentAdded)="onCommentAdded($event)">
</app-comment-modal>
*/