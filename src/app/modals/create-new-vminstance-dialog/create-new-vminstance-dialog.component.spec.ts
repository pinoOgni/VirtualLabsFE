import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateNewVMInstanceDialogComponent} from './create-new-vminstance-dialog.component';

describe('CreateNewVMInstanceDialogComponent', () => {
  let component: CreateNewVMInstanceDialogComponent;
  let fixture: ComponentFixture<CreateNewVMInstanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewVMInstanceDialogComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewVMInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
