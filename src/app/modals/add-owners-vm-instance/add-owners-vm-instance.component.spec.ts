import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnersVmInstanceComponent } from './add-owners-vm-instance.component';

describe('AddOwnersVmInstanceComponent', () => {
  let component: AddOwnersVmInstanceComponent;
  let fixture: ComponentFixture<AddOwnersVmInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOwnersVmInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOwnersVmInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
