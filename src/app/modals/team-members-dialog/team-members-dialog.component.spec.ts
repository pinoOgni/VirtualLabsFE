import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersDialogComponent } from './team-members-dialog.component';

describe('TeamMembersDialogComponent', () => {
  let component: TeamMembersDialogComponent;
  let fixture: ComponentFixture<TeamMembersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMembersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
