import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent {


  assignmentId: number;

  studentId: string;

  scoreForm: FormGroup;

  constructor(private assignmentService: AssignmentService, private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<ScoreDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
      this.assignmentId = data.assignmentId;
      this.studentId = data.studentId;
      console.log('constructor scoredialog ', this.assignmentId, ',,,,,,', data.assignmentId)
      this.scoreForm = this.formBuilder.group({
        score: [Validators.required]
      })
   }

   onSubmit() {
    if (this.scoreForm.invalid) {
      return;
    }
    const scoreFormData = new FormData();

    scoreFormData.append('score',this.scoreForm.get('score').value)
    console.log('onsubmit score dialog ', this.assignmentId)
    this.assignmentService.addScoreToHomework(scoreFormData,this.assignmentId,this.studentId).pipe(first()).subscribe((homework) => {
      if (homework) {
        this.dialogRef.close(homework);
      }
    });
  }

}
