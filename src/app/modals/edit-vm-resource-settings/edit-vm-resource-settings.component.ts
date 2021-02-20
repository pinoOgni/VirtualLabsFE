import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VmInstanceModel} from '../../models/vm-instance-model';

@Component({
  selector: 'app-edit-vm-resource-settings',
  templateUrl: './edit-vm-resource-settings.component.html',
  styleUrls: ['./edit-vm-resource-settings.component.css']
})
export class EditVmResourceSettingsComponent implements OnInit {
  editResourcesForm: FormGroup;
  team: VmInstanceModel;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
        t: VmInstanceModel
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
    this.team = data.t;
    console.log('sono dialog: ' + this.team.name);
    this.editResourcesForm.controls.maxVCpu.setValue(this.team.vcpu);
    this.editResourcesForm.controls.maxDiskSpace.setValue(this.team.disk);
    this.editResourcesForm.controls.maxRam.setValue(this.team.memory);
    //  this.editResourcesForm.controls.maxTotalInstances.setValue(this.team.maxVmInstance);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.editResourcesForm.valid) {
      this.team.vcpu = this.editResourcesForm.controls.maxVCpu.value;
      this.team.disk = this.editResourcesForm.controls.maxDiskSpace.value;
      this.team.memory = this.editResourcesForm.controls.maxRam.value;
      // this.team.maxVmInstance = this.editResourcesForm.controls.maxTotalInstances.value;
      this.dialogRef.close(
          {
            ok: true,
            newTeam: this.team,
          }
      );
    }

  }
}
