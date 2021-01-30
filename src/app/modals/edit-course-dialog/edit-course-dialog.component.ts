import {Component, Inject, OnInit} from '@angular/core';
import {EditCourseModel} from '../../models/form-models';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VmModel} from '../../models/vm-model.model';
import {Course} from '../../models/course.model';

@Component({
    selector: 'app-edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {

    serverErrors: string;
    editCourseForm: FormGroup;
    model: EditCourseModel;
    vmModel: VmModel;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            editedCourse: Course
        },
        private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EditCourseDialogComponent>) {
        // this.model = {username: '', password: ''};
        this.editCourseForm = this.formBuilder.group ({
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
        this.editCourseForm.controls.courseFullName.setValue(data.editedCourse.fullName);
        this.editCourseForm.controls.courseAcronym.setValue(data.editedCourse.acronym);
        this.editCourseForm.controls.courseMinStudents.setValue(data.editedCourse.minStudentsForTeam);
        this.editCourseForm.controls.courseMaxStudents.setValue(data.editedCourse.maxStudentsForTeam);
        this.editCourseForm.controls.courseEnabled.setValue(String(data.editedCourse.enabled));
        this.editCourseForm.controls.vmModelVcpus.setValue(data.editedCourse.vcpus);
        this.editCourseForm.controls.vmModelDiskSpace.setValue(data.editedCourse.diskSpace);
        this.editCourseForm.controls.vmModelRamSize.setValue(data.editedCourse.ramSize);


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
        if ( this.editCourseForm.valid) {
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
        }
        else{
            this.dialogRef.close({
                logged: false
                }
            );
        }
    }

}
