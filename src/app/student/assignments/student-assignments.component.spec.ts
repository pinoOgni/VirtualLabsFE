import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentsComponent } from './student-assignments.component';

describe('StudentAssignmentsComponent', () => {
  let component: StudentAssignmentsComponent;
  let fixture: ComponentFixture<StudentAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
