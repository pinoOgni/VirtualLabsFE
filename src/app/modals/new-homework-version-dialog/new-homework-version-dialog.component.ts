import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { InputFile } from 'src/app/models/input-file.model';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-new-homework-version-dialog',
  templateUrl: './new-homework-version-dialog.component.html',
  styleUrls: ['./new-homework-version-dialog.component.css']
})
export class NewHomeworkVersionDialogComponent{

  assignmentId: number;

  studentId: string;

  homeworkVersionForm: FormGroup;

  assignmentName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private assignmentService: AssignmentService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewHomeworkVersionDialogComponent>) {
    this.assignmentId = data.assignmentId;
    this.assignmentName = data.assignmentName;
    
    this.homeworkVersionForm = this.formBuilder.group({
      content: ''
    });
   }


   onSubmit() {
    if (this.homeworkVersionForm.invalid) {
      return;
    }
    const homeworkVersionFormData = new FormData();

    const fileInput: InputFile = this.homeworkVersionForm.get('content').value;
    homeworkVersionFormData.append('content',fileInput.files[0]);

    this.assignmentService.newHomeworkVersion(homeworkVersionFormData,this.assignmentId).pipe(first()).subscribe((homeworkVersion) => {
      if (homeworkVersion) {
        this.dialogRef.close(homeworkVersion);
      }
    });
  }

}
