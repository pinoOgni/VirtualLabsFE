import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContentHomeworkVersionComponent } from './view-content-homework-version.component';

describe('ViewContentHomeworkVersionComponent', () => {
  let component: ViewContentHomeworkVersionComponent;
  let fixture: ComponentFixture<ViewContentHomeworkVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContentHomeworkVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContentHomeworkVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
