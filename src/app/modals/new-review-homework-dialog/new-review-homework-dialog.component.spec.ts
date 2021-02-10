import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewHomeworkDialogComponent } from './new-review-homework-dialog.component';

describe('NewReviewHomeworkDialogComponent', () => {
  let component: NewReviewHomeworkDialogComponent;
  let fixture: ComponentFixture<NewReviewHomeworkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReviewHomeworkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewHomeworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
