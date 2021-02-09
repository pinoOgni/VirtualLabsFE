import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditVmResourceSettingsComponent} from './edit-vm-resource-settings.component';

describe('EditVmResourceSettingsComponent', () => {
  let component: EditVmResourceSettingsComponent;
  let fixture: ComponentFixture<EditVmResourceSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditVmResourceSettingsComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVmResourceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
