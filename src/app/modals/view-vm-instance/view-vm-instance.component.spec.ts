import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVmInstanceComponent } from './view-vm-instance.component';

describe('ViewVmInstanceComponent', () => {
  let component: ViewVmInstanceComponent;
  let fixture: ComponentFixture<ViewVmInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVmInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVmInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
