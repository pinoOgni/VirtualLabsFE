import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsResourcesComponent } from './vms-resources.component';

describe('VmsResourcesComponent', () => {
  let component: VmsResourcesComponent;
  let fixture: ComponentFixture<VmsResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
