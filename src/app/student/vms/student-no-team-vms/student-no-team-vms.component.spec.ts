import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentNoTeamVmsComponent} from './student-no-team-vms.component';

describe('StudentNoTeamVmsComponent', () => {
  let component: StudentNoTeamVmsComponent;
  let fixture: ComponentFixture<StudentNoTeamVmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNoTeamVmsComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNoTeamVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
