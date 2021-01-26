import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditCourseModel} from '../../models/form-models';
import {VmModel} from '../../models/vm-model.model';
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
  vmModel: VmModel;

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
      id: -1,
      acronym: '',
      enabled: '',
      fullName: '',
      maxStudentsForTeam: '',
      minStudentsForTeam: ''
    };
    this.vmModel = {
      id: -1,
      name: '',
      courseId: -1,
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
      this.vmModel.name = this.editCourseForm.controls.vmModelName.value;
      this.vmModel.vcpus = Number(this.editCourseForm.controls.vmModelVcpus.value);
      this.vmModel.diskSpace = Number(this.editCourseForm.controls.vmModelDiskSpace.value);
      this.vmModel.ramSize = Number(this.editCourseForm.controls.vmModelRamSize.value);

      this.dialogRef.close(
          {
            logged: true,
            newCourseModel: this.model,
            newVmModel: this.vmModel
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
