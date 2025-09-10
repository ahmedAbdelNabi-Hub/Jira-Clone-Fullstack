import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICreateCommet } from '../../../../../../../../core/interfaces/ICreateCommet';
import { TaskService } from '../../../../../../../../core/services/Task.service';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../../../../../../../core/services/toast.service';
import { IComment } from '../../../../../../../../core/interfaces/IComment';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isModalOpen()" 
         class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2"
         (click)="closeModal()">
      
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden"
           (click)="$event.stopPropagation()">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <div class="flex items-center justify-center space-x-2">
            <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <i class='bx bx-comment text-xl text-white'></i>
            </div>
            <div class="flex items-center space-x-3">
              <h2 class="text-lg font-semibold text-gray-800">Comments</h2>
              <p class="text-xs text-gray-500">{{comments.length}} comment{{comments.length !== 1 ? 's' : ''}}</p>
            </div>
          </div>
          <button (click)="closeModal()" 
                  class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <i class='bx bx-x text-lg'></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex flex-col h-80">
          <!-- Comments List -->
          <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <!-- No Comments State -->
            <div *ngIf="comments.length === 0" class="text-center py-6">
              <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <i class='bx bx-comment text-xl text-gray-400'></i>
              </div>
              <p class="text-sm text-gray-500">No comments yet</p>
              <p class="text-xs text-gray-400">Be the first to share!</p>
            </div>

            <!-- Comments -->
            <div *ngFor="let comment of comments; trackBy: trackByCommentId" 
                 class="flex space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {{getInitials(comment.userName)}}
                </div>
              </div>
              
              <!-- Comment Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-1 mb-0.5">
                  <span class="text-xs font-medium text-gray-800">{{comment.userName}}</span>
                  <span class="text-xs text-gray-400">{{formatTimestamp(comment.createAt)}}</span>
                </div>
                <p class="text-xs text-gray-600 leading-relaxed break-words">{{comment.content}}</p>
              </div>
            </div>
          </div>

          <!-- Add Comment Form -->
          <div class="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <form (ngSubmit)="addComment()" #commentForm="ngForm" class="flex space-x-2">
              <textarea 
                [(ngModel)]="data.content"
                name="comment"
                required
                rows="1"
                class="flex-1 px-2 py-1.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all text-xs resize-none"
                placeholder="Add a comment..."></textarea>
              <button 
                type="submit" 
                [disabled]="!commentForm.form.valid || isSaving"
                class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-all text-xs font-medium">
                <i class='bx bx-send' [class.bx-loader-alt]="isSaving" [class.bx-spin]="isSaving"></i>
              </button>
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
    .overflow-y-auto {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    }

    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    @media (max-width: 640px) {
      .max-w-lg {
        max-width: 100%;
      }
      textarea {
        font-size: 11px;
      }
      button {
        font-size: 11px;
        padding: 0.25rem 0.5rem;
      }
    }
  `]
})
export class CommentModalComponent implements OnChanges, OnInit {
  @Input() comments: IComment[] = [];
  @Input() data!: ICreateCommet;
  @Output() commentAdded = new EventEmitter<IComment>();
  @Input() isModalOpen = signal<boolean>(false);
  isSaving = false;

  constructor(private taskService: TaskService, private toastService: ToastService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue?.taskItemId) {
      this.loadComments(); // يحصل مرّة واحدة بس لما يتغير TaskId
    }
  }

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const textarea = document.querySelector('textarea[name="comment"]') as HTMLTextAreaElement;
      if (textarea) textarea.focus();
    }, 100);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.comments = [];
    document.body.style.overflow = 'auto';
  }

  getInitials(name: string): string {
    if (!name) return 'AN';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatTimestamp(timestamp: string | Date): string {
    const dateObj = timestamp instanceof Date ? timestamp : new Date(timestamp);

    if (isNaN(dateObj.getTime())) return '';

    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return dateObj.toLocaleDateString();
  }

  trackByCommentId(index: number, comment: IComment): number {
    return comment.id;
  }

  addComment(): void {
    this.isSaving = true;
    this.taskService.createComment(this.data).pipe(
      tap(response => {
        if (response) {
          this.isSaving = false;
          this.data = { ...this.data, content: '' };
          this.loadComments();
        }
      }),
      catchError(error => {
        this.toastService.showError(error.error.message);
        this.isSaving = false;
        return of();
      })
    ).subscribe();
  }

  loadComments(): void {
    this.taskService.getComments(this.data.taskItemId!).pipe(
      tap(response => {
        if (response) {
          this.comments = response;
        }
      }),
      catchError(error => {
        this.comments = [];
        return of();
      })
    ).subscribe();
  }
}
