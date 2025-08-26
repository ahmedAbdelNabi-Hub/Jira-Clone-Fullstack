import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignmentDropdownComponent } from './user-assignment-dropdown.component';

describe('UserAssignmentDropdownComponent', () => {
  let component: UserAssignmentDropdownComponent;
  let fixture: ComponentFixture<UserAssignmentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAssignmentDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssignmentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
