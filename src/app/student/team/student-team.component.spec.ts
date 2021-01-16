import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeamComponent } from './student-team.component';

describe('StudentTeamComponent', () => {
  let component: StudentTeamComponent;
  let fixture: ComponentFixture<StudentTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
