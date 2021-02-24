import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeworkVersion } from 'src/app/models/homework-version.model';
import { HomeworkStatus } from 'src/app/models/homework.model';
import { InputFile } from 'src/app/models/input-file.model';
import { Student } from 'src/app/models/student.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-homework-version',
  templateUrl: './view-homework-version.component.html',
  styleUrls: ['./view-homework-version.component.css']
})
export class ViewHomeworkVersionComponent {

  homeworkVersionDataSource = new MatTableDataSource<HomeworkVersion>();

  columnsToDisplay = ['versionStatus', 'timestamp', 'content'];

  reviewForm: FormGroup;
 
  student: Student;

  assignmentId: number;
  studentId: string;

  canReSubmitValue: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private authService: AuthService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ViewHomeworkVersionComponent>, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private assignmentService: AssignmentService, private studentService: StudentService)  {
      this.assignmentId = data.assignmentId;
      this.studentId = data.studentId;

      this.reviewForm = this.formBuilder.group({
        review: '',
      });

    this.studentService.getStudent(data.studentId).subscribe(
      s => this.student = s
    );
    this.assignmentService.getHomeworkVersionsOfStudent(this.assignmentId, this.studentId).pipe(first())
    .subscribe(
      homeworkVersions => {
        this.homeworkVersionDataSource.data = homeworkVersions.sort(HomeworkVersion.compareHomeworkVersion)
      }
        );
  }


  setCanReSubmit(value: boolean) {
    this.canReSubmitValue = value;
  }


  dateToString(date: string): string {
    const newDate = new Date(date);
    return (
      newDate.toLocaleDateString('en-GB') +
      ' at ' +
      newDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
  }


  /**
 * This method is used to display the student
 * @param student 
 */
  displayFn(student: Student): string {
    return student ? Student.toString(student) : '';
  }

  // TODO
  /**
   * This method return true if the teacher can upload a new
   * review
   */
  isUploadable(): boolean {
    return this.homeworkVersionDataSource.data.length > 0 && (
      this.homeworkVersionDataSource.data[this.homeworkVersionDataSource.data.length - 1].versionStatus === HomeworkStatus.REVIEWED 
      || this.homeworkVersionDataSource.data[this.homeworkVersionDataSource.data.length -1].versionStatus === HomeworkStatus.SUBMITTED);
      
  }




  onSubmit() {
    if(this.reviewForm.invalid) {
      return;
    }
    const reviewFormData = new FormData();

    const fileInput: InputFile = this.reviewForm.get('review').value;
    reviewFormData.append('content',fileInput.files[0]);
    if(this.isTeacher()) {
      this.assignmentService.newReviewToHomework(reviewFormData,this.canReSubmitValue,this.assignmentId,this.studentId).pipe(first())
      .subscribe((homeworkVersion) => this.dialogRef.close(homeworkVersion));
    }

  }

  /**
   * This method control the current user role
   */
  isTeacher(): boolean {
    return this.authService.currentUserValue.roles[0] === 'ROLE_TEACHER';
  }

}
