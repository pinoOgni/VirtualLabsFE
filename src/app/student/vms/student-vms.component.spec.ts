import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVmsComponent } from './student-vms.component';

describe('StudentVmsComponent', () => {
  let component: StudentVmsComponent;
  let fixture: ComponentFixture<StudentVmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentVmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
