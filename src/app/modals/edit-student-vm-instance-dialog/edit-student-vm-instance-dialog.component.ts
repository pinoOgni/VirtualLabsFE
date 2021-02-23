import {Component, Inject, OnInit} from '@angular/core';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Team} from '../../models/team.model';

@Component({
  selector: 'app-edit-student-vm-instance-dialog',
  templateUrl: './edit-student-vm-instance-dialog.component.html',
  styleUrls: ['./edit-student-vm-instance-dialog.component.css']
})
export class EditStudentVmInstanceDialogComponent implements OnInit {
  editResourcesForm: FormGroup;
  team: Team;
  vmInstance: VmInstanceModel;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
        vmInstanceP: VmInstanceModel
      },
      private dialogRef: MatDialogRef<EditStudentVmInstanceDialogComponent>,
      private formBuilder: FormBuilder
  ) {
    this.editResourcesForm = this.formBuilder.group({
      maxVCpu: ['', Validators.required],
      maxDiskSpace: ['', Validators.required],
      maxRam: ['', Validators.required],
    });
    this.vmInstance = data.vmInstanceP;

    this.editResourcesForm.controls.maxVCpu.setValue(this.vmInstance.vcpu);
    this.editResourcesForm.controls.maxDiskSpace.setValue(this.vmInstance.disk);
    this.editResourcesForm.controls.maxRam.setValue(this.vmInstance.memory);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.editResourcesForm.valid) {
      this.vmInstance.vcpu = this.editResourcesForm.controls.maxVCpu.value;
      this.vmInstance.disk = this.editResourcesForm.controls.maxDiskSpace.value;
      this.vmInstance.memory = this.editResourcesForm.controls.maxRam.value;
      // this.team.maxVmInstance = this.editResourcesForm.controls.maxTotalInstances.value;
      this.dialogRef.close(
          {
            ok: true,
            newVmInstance: this.vmInstance,
          }
      );
    }

  }
}
