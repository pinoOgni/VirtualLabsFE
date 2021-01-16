import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNoTeamComponent } from './student-no-team.component';

describe('StudentNoTeamComponent', () => {
  let component: StudentNoTeamComponent;
  let fixture: ComponentFixture<StudentNoTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNoTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
