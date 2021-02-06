import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditCourseModel} from '../../models/form-models';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

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
      vmModelName: ['', Validators.required],
      vmModelVcpu: ['', Validators.required],
      vmModelDisk: ['', Validators.required],
      vmModelMemory: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.model = {
      acronym: '',
      enabled: '',
      name: '',
      max: '',
      min: '',
      vcpu: -1,
      disk: -1,
      memory: -1
    };
  }

  close(isLogged: boolean) {
    this.dialogRef.close(isLogged);
  }

  submit() {
    if (this.editCourseForm.valid) {
      this.model.name = this.editCourseForm.controls.courseName.value;
      this.model.acronym = this.editCourseForm.controls.courseAcronym.value;
      this.model.min= this.editCourseForm.controls.courseMin.value;
      this.model.max = this.editCourseForm.controls.courseMax.value;
      this.model.enabled = this.editCourseForm.controls.courseEnabled.value;
      this.model.vcpu = Number(this.editCourseForm.controls.vmModelVcpu.value);
      this.model.disk = Number(this.editCourseForm.controls.vmModelDisk.value);
      this.model.memory = Number(this.editCourseForm.controls.vmModelMemory.value);

      this.dialogRef.close(
          {
            logged: true,
            newCourseModel: this.model,
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
