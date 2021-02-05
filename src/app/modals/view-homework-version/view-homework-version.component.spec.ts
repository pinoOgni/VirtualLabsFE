import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeworkVersionComponent } from './view-homework-version.component';

describe('ViewHomeworkVersionComponent', () => {
  let component: ViewHomeworkVersionComponent;
  let fixture: ComponentFixture<ViewHomeworkVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeworkVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeworkVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
