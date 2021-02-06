import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsContComponent } from './teacher-assignments.container';

describe('AssignmentsContComponent', () => {
  let component: AssignmentsContComponent;
  let fixture: ComponentFixture<AssignmentsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
