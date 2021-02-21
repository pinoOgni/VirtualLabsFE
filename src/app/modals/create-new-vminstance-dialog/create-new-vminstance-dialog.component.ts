import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-vminstance-dialog',
  templateUrl: './create-new-vminstance-dialog.component.html',
  styleUrls: ['./create-new-vminstance-dialog.component.css']
})
export class CreateNewVMInstanceDialogComponent implements OnInit {

  editResourcesForm: FormGroup;
  t;

  constructor(
      private dialogRef: MatDialogRef<CreateNewVMInstanceDialogComponent>,
      private formBuilder: FormBuilder
  ) {
    this.editResourcesForm = this.formBuilder.group({
      vmName: ['', Validators.required],
      maxVCpu: ['', Validators.required],
      maxDiskSpace: ['', Validators.required],
      maxRam: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.editResourcesForm.valid) {
      const vmInstance: VmInstanceModel = new VmInstanceModel(
          this.editResourcesForm.controls.vmName.value,
          this.editResourcesForm.controls.maxVCpu.value,
          this.editResourcesForm.controls.maxDiskSpace.value,
          this.editResourcesForm.controls.maxRam.value
      );
      // this.team.maxVmInstance = this.editResourcesForm.controls.maxTotalInstances.value;
      this.dialogRef.close(
          {
            ok: true,
            newVmInstance: vmInstance,
          }
      );
    }

  }
}
