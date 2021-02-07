import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Team} from '../../models/team.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-vm-resource-settings',
  templateUrl: './edit-vm-resource-settings.component.html',
  styleUrls: ['./edit-vm-resource-settings.component.css']
})
export class EditVmResourceSettingsComponent implements OnInit {
  editResourcesForm: FormGroup;
  team: Team;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
        t: Team
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

    this.editResourcesForm.controls.maxVCpu.setValue(this.team.maxVCpu);
    this.editResourcesForm.controls.maxDiskSpace.setValue(this.team.maxDiskSpace);
    this.editResourcesForm.controls.maxRam.setValue(this.team.maxRam);
    this.editResourcesForm.controls.maxTotalInstances.setValue(this.team.maxTotalInstances);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.editResourcesForm.valid) {
      this.team.maxVCpu = this.editResourcesForm.controls.maxVCpu.value;
      this.team.maxDiskSpace = this.editResourcesForm.controls.maxDiskSpace.value;
      this.team.maxRam = this.editResourcesForm.controls.maxRam.value;
      this.team.maxTotalInstances = this.editResourcesForm.controls.maxTotalInstances.value;
      this.dialogRef.close(
          {
            ok: true,
            newTeam: this.team,
          }
      );
    }

  }
}
