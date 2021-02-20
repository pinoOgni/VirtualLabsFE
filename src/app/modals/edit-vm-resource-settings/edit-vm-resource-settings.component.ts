import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Team} from '../../models/team.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VmInstanceModel } from 'src/app/models/vm-instance-model';

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
        vmInstance: VmInstanceModel
      },
      private dialogRef: MatDialogRef<EditVmResourceSettingsComponent>,
      private formBuilder: FormBuilder
  ) {
    this.editResourcesForm = this.formBuilder.group({
      maxVCpu: ['', Validators.required],
      maxDiskSpace: ['', Validators.required],
      maxRam: ['', Validators.required],
      maxTotalInstances: ['', Validators.required]
    });
    this.vmInstance = data.vmInstance;

    this.editResourcesForm.controls.maxVCpu.setValue(this.team.vcpuMAX);
    this.editResourcesForm.controls.maxDiskSpace.setValue(this.team.diskMAX);
    this.editResourcesForm.controls.maxRam.setValue(this.team.memoryMAX);
    this.editResourcesForm.controls.maxTotalInstances.setValue(this.team.maxVmInstance);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.editResourcesForm.valid) {
      this.team.vcpuMAX = this.editResourcesForm.controls.maxVCpu.value;
      this.team.diskMAX = this.editResourcesForm.controls.maxDiskSpace.value;
      this.team.memoryMAX = this.editResourcesForm.controls.maxRam.value;
      this.team.maxVmInstance = this.editResourcesForm.controls.maxTotalInstances.value;
      this.dialogRef.close(
          {
            ok: true,
            newTeam: this.team,
          }
      );
    }

  }
}
