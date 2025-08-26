import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProjectUpdateComponent } from './modal-project-update.component';

describe('ModalProjectUpdateComponent', () => {
  let component: ModalProjectUpdateComponent;
  let fixture: ComponentFixture<ModalProjectUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProjectUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
