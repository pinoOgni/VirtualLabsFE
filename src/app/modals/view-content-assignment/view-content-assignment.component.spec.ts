import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContentAssignmentComponent } from './view-content-assignment.component';

describe('ViewContentAssignmentComponent', () => {
  let component: ViewContentAssignmentComponent;
  let fixture: ComponentFixture<ViewContentAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContentAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContentAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
