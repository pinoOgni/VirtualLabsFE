import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsContComponent } from './students-cont.component';

describe('StudentsContComponent', () => {
  let component: StudentsContComponent;
  let fixture: ComponentFixture<StudentsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
