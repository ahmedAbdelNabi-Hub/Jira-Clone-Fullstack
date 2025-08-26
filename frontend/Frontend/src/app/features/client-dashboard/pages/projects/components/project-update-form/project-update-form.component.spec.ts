import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateFormComponent } from './project-update-form.component';

describe('ProjectUpdateFormComponent', () => {
  let component: ProjectUpdateFormComponent;
  let fixture: ComponentFixture<ProjectUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
