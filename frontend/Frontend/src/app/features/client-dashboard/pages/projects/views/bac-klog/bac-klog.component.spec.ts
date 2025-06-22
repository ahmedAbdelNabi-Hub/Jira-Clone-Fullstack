import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacKlogComponent } from './bac-klog.component';

describe('BacKlogComponent', () => {
  let component: BacKlogComponent;
  let fixture: ComponentFixture<BacKlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacKlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacKlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
