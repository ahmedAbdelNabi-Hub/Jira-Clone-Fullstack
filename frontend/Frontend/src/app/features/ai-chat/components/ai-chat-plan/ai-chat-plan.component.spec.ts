import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatPlanComponent } from './ai-chat-plan.component';

describe('AiChatPlanComponent', () => {
  let component: AiChatPlanComponent;
  let fixture: ComponentFixture<AiChatPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChatPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiChatPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
