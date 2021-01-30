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
      courseFullName: ['', Validators.required],
      courseAcronym: ['', Validators.required],
      courseMinStudents: ['', Validators.required],
      courseMaxStudents: ['', Validators.required],
      courseEnabled: ['', Validators.required],
      vmModelName: ['', Validators.required],
      vmModelVcpus: ['', Validators.required],
      vmModelDiskSpace: ['', Validators.required],
      vmModelRamSize: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.model = {
      acronym: '',
      enabled: '',
      fullName: '',
      maxStudentsForTeam: '',
      minStudentsForTeam: '',
      vcpus: -1,
      diskSpace: -1,
      ramSize: -1
    };
  }

  close(isLogged: boolean) {
    this.dialogRef.close(isLogged);
  }

  submit() {
    if (this.editCourseForm.valid) {
      this.model.fullName = this.editCourseForm.controls.courseFullName.value;
      this.model.acronym = this.editCourseForm.controls.courseAcronym.value;
      this.model.minStudentsForTeam = this.editCourseForm.controls.courseMinStudents.value;
      this.model.maxStudentsForTeam = this.editCourseForm.controls.courseMaxStudents.value;
      this.model.enabled = this.editCourseForm.controls.courseEnabled.value;
      this.model.vcpus = Number(this.editCourseForm.controls.vmModelVcpus.value);
      this.model.diskSpace = Number(this.editCourseForm.controls.vmModelDiskSpace.value);
      this.model.ramSize = Number(this.editCourseForm.controls.vmModelRamSize.value);

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
