import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMediaComponent } from './chat-media.component';

describe('ChatMediaComponent', () => {
  let component: ChatMediaComponent;
  let fixture: ComponentFixture<ChatMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
