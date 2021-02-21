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
            editedCourse: Course,

        },
        private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EditCourseDialogComponent>) {
        // this.model = {username: '', password: ''};
        this.editCourseForm = this.formBuilder.group ({
            courseName: ['', Validators.required],
            courseAcronym: ['', Validators.required],
            courseMin: ['', Validators.required],
            courseMax: ['', Validators.required],
            courseEnabled: ['', Validators.required],
            vmModelVcpu: ['', Validators.required],
            vmModelDisk: ['', Validators.required],
            vmModelMemory: ['', Validators.required],
            vmModelMaxInstances: ['', Validators.required],
            vmModelMaxRunningInstances: ['', Validators.required]

        });

        this.editCourseForm.controls.courseName.setValue(data.editedCourse.name);
        this.editCourseForm.controls.courseAcronym.setValue(data.editedCourse.acronym);
        this.editCourseForm.controls.courseMin.setValue(data.editedCourse.min);
        this.editCourseForm.controls.courseMax.setValue(data.editedCourse.max);
        this.editCourseForm.controls.courseEnabled.setValue(String(data.editedCourse.enabled));
        this.editCourseForm.controls.vmModelVcpu.setValue(data.editedCourse.vcpu);
        this.editCourseForm.controls.vmModelDisk.setValue(data.editedCourse.disk);
        this.editCourseForm.controls.vmModelMemory.setValue(data.editedCourse.memory);
        this.editCourseForm.controls.vmModelMaxInstances.setValue(data.editedCourse.maxVmInstance);
        this.editCourseForm.controls.vmModelMaxRunningInstances.setValue(data.editedCourse.maxRunningVmInstance);


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
            runningInstances: -1,
        };
    }

    close(isLogged: boolean) {
        this.dialogRef.close(isLogged);
    }

    submit() {
        if ( this.editCourseForm.valid) {
            this.model.name = this.editCourseForm.controls.courseName.value;
            this.model.acronym = this.editCourseForm.controls.courseAcronym.value;
            this.model.min = Number(this.editCourseForm.controls.courseMin.value);
            this.model.max = Number(this.editCourseForm.controls.courseMax.value);
            this.model.enabled = this.editCourseForm.controls.courseEnabled.value;
            this.model.vcpu = Number(this.editCourseForm.controls.vmModelVcpu.value);
            this.model.disk = Number(this.editCourseForm.controls.vmModelDisk.value);
            this.model.memory = Number(this.editCourseForm.controls.vmModelMemory.value);
            this.model.instances = Number(this.editCourseForm.controls.vmModelMaxInstances.value);
            this.model.runningInstances = Number(this.editCourseForm.controls.vmModelMaxRunningInstances.value);

            this.dialogRef.close(
                {
                    logged: true,
                    editedCourse: this.model,

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
