import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectMemberComponent } from './manage-project-member.component';

describe('ManageProjectMemberComponent', () => {
  let component: ManageProjectMemberComponent;
  let fixture: ComponentFixture<ManageProjectMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProjectMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
