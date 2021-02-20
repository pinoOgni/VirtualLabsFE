import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Team} from '../../models/team.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VmInstanceModel} from 'src/app/models/vm-instance-model';

@Component({
  selector: 'app-edit-vm-resource-settings',
  templateUrl: './edit-vm-resource-settings.component.html',
  styleUrls: ['./edit-vm-resource-settings.component.css']
})
export class EditVmResourceSettingsComponent implements OnInit {
  editResourcesForm: FormGroup;
  team: Team;
  vmInstance: VmInstanceModel;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
        vmInstanceP: VmInstanceModel
      },
      private dialogRef: MatDialogRef<EditVmResourceSettingsComponent>,
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
