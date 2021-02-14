import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditStudentVmInstanceDialogComponent} from './edit-student-vm-instance-dialog.component';

describe('EditStudentVmInstanceDialogComponent', () => {
  let component: EditStudentVmInstanceDialogComponent;
  let fixture: ComponentFixture<EditStudentVmInstanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentVmInstanceDialogComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentVmInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
