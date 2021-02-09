import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HomeworkVersion } from 'src/app/models/homework-version.model';
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
 
  student: Student;

  constructor(public dialogRef: MatDialogRef<ViewHomeworkVersionComponent>, public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router, private assignmentService: AssignmentService, private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('constructor ViewHomeworkVersionComponent')
    this.studentService.getStudent(data.studentId).subscribe(
      s => this.student = s
    );
    this.assignmentService.getHomeworkVersionsOfStudent(data.assignmentId, data.studentId).pipe(first())
    .subscribe(
      homeworkVersions => {
        console.log('ciao ', homeworkVersions);
        this.homeworkVersionDataSource.data = homeworkVersions.sort(HomeworkVersion.compareHomeworkVersion)
      }
        );
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
    console.log('displayFn student.id', student ? Student.toString(student) : '');
    return student ? Student.toString(student) : '';
  }



  isUploadable(): boolean {
    return true;
  }

}
