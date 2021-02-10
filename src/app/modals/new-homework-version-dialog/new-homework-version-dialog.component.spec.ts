import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeworkVersionDialogComponent } from './new-homework-version-dialog.component';

describe('NewHomeworkVersionDialogComponent', () => {
  let component: NewHomeworkVersionDialogComponent;
  let fixture: ComponentFixture<NewHomeworkVersionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeworkVersionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeworkVersionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
