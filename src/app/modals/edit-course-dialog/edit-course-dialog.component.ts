import {Component, Inject, OnInit} from '@angular/core';
import {EditCourseModel, LoginModel} from '../../models/form-models';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';

@Component({
    selector: 'app-edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {

    serverErrors: string;
    editCourseForm: FormGroup;
    model: EditCourseModel;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
              courseFullName: string,
              courseAcronym: string,
              maxStudents: number,
              minStudents: number,
              enabled: boolean
    }, private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EditCourseDialogComponent>) {
        // this.model = {email: '', password: ''};
        this.editCourseForm = this.formBuilder.group ({
            courseFullName: ['', Validators.required],
            courseAcronym: ['', Validators.required],
            courseMinStudents: ['', Validators.required],
            courseMaxStudents: ['', Validators.required],
            courseEnabled: ['', Validators.required]
        });
    }

    ngOnInit() {

        this.model = {
            id:  -1,
            acronym: '' ,
            enabled: false,
            fullName: '',
            maxStudentsForTeam: 0,
            minStudentsForTeam: 0
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

            // console.log('mi è arrivato: ' + this.model.enabled);
            // let route ='/home';
            this.dialogRef.close(
                {
                    logged: true,
                    newCourseModel: this.model
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
