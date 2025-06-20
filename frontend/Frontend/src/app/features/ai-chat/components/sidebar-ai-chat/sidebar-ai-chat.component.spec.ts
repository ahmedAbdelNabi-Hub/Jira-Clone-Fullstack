import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAiChatComponent } from './sidebar-ai-chat.component';

describe('SidebarAiChatComponent', () => {
  let component: SidebarAiChatComponent;
  let fixture: ComponentFixture<SidebarAiChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAiChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
