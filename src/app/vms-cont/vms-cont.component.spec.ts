import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsContComponent } from './vms-cont.component';

describe('VmsContComponent', () => {
  let component: VmsContComponent;
  let fixture: ComponentFixture<VmsContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
