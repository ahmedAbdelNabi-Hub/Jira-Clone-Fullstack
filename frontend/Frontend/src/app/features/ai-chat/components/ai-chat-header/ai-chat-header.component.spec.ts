import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatHeaderComponent } from './ai-chat-header.component';

describe('AiChatHeaderComponent', () => {
  let component: AiChatHeaderComponent;
  let fixture: ComponentFixture<AiChatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChatHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiChatHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
