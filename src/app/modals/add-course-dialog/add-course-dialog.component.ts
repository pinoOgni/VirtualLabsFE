import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditCourseModel} from '../../models/form-models';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {VmModel} from '../../models/vm-model.model';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {


  serverErrors: string;
  editCourseForm: FormGroup;
  model: EditCourseModel;


  constructor(
      private auth: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private dialogRef: MatDialogRef<AddCourseDialogComponent>) {
    // this.model = {email: '', password: ''};
    this.editCourseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseAcronym: ['', Validators.required],
      courseMin: ['', Validators.required],
      courseMax: ['', Validators.required],
      courseEnabled: ['', Validators.required],
      vmModelVcpu: ['', Validators.required],
      vmModelDisk: ['', Validators.required],
      vmModelMemory: ['', Validators.required],
      vmModelInstances: ['', Validators.required],
      vmModelMaxRunningInstances: ['', Validators.required],
      vmModelName: ['', Validators.required],
      vmModelConfiguration: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.model = {
      acronym: '',
      enabled: '',
      name: '',
      max: -1,
      min: -1,
      vcpu: -1,
      disk: -1,
      memory: -1,
      instances: -1,
      runningInstances: -1
    };
  }

  close(isLogged: boolean) {
    this.dialogRef.close(isLogged);
  }

  submit() {
    if (this.editCourseForm.valid) {
      this.model.name = this.editCourseForm.controls.courseName.value;
      this.model.acronym = this.editCourseForm.controls.courseAcronym.value;
      this.model.min = Number(this.editCourseForm.controls.courseMin.value);
      this.model.max = Number(this.editCourseForm.controls.courseMax.value);
      this.model.enabled = this.editCourseForm.controls.courseEnabled.value;
      this.model.vcpu = Number(this.editCourseForm.controls.vmModelVcpu.value);
      this.model.disk = Number(this.editCourseForm.controls.vmModelDisk.value);
      this.model.memory = Number(this.editCourseForm.controls.vmModelMemory.value);
      this.model.instances = Number(this.editCourseForm.controls.vmModelInstances.value);
      this.model.runningInstances = Number(this.editCourseForm.controls.vmModelMaxRunningInstances.value);

      const vmModel: VmModel = new VmModel(this.editCourseForm.controls.vmModelName.value, this.editCourseForm.controls.vmModelConfiguration.value);
      this.dialogRef.close(
          {
            logged: true,
            newCourseModel: this.model,
            newVmModel: vmModel
          }
      );
    } else {
      this.dialogRef.close({
            logged: false
          }
      );
    }
  }

}
