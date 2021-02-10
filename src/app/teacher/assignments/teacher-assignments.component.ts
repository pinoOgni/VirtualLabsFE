import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from 'src/app/models/assignment.model';
import { HomeworkInfoStudent } from 'src/app/models/homework-info-student.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Homework, HomeworkStatus } from 'src/app/models/homework.model';
import { ViewHomeworkVersionComponent } from 'src/app/modals/view-homework-version/view-homework-version.component';
import { first } from 'rxjs/operators';
import { ScoreDialogComponent } from 'src/app/modals/score-dialog/score-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NewReviewHomeworkDialogComponent } from 'src/app/modals/new-review-homework-dialog/new-review-homework-dialog.component';
import { version } from 'moment';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherAssignmentsComponent implements AfterViewInit {


  showSpinner: boolean;

  selectedStudentId: string;

  /** 
   * data source for the list of assignments
   */
  assignmentsDataSource = new MatTableDataSource<Assignment>();

  homeworksInfoStudentsDataSource = new MatTableDataSource<HomeworkInfoStudent>();

  assignmentColumnsToDisplay = ['name', 'releaseDate', 'expiryDate', 'content', 'homeworks'];

  homeworksInfoStudentsColumnsToDisplay = ['student_id', 'studentFirstName', 'studentLastName', 'currentStatus', 'score', 'versions']


  filteredStatuses: string[] = [];

  /**
   * This is used to display all type of status for a homework
   */
  homeworkStatuses = Object.values(HomeworkStatus);

  expandedAssignment: Assignment; // | null

  // expandHomeworksInfoStudents: HomeworkInfoStudent | null;

  @Input() set assignments(assignments: Assignment[]) {
    this.assignmentsDataSource.data = assignments.sort(Assignment.compareAssignment);
  }

  @Input() set setHomeworksInfoStudents(homeworksInfoStudents: HomeworkInfoStudent[]) {
    console.log('set homeworksInfoStudents ', homeworksInfoStudents)
    this.homeworksInfoStudentsDataSource.data = homeworksInfoStudents;
  }

  @Output() homeworksInfoStudentsEvent = new EventEmitter<number>();


  @ViewChild('assignments') paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  @Output() viewContentHomeworkVersionEvent = new EventEmitter<{ assignmentId: number, studentId: string, versionId: number }>();



  constructor(public spinnerService: SpinnerService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.assignmentsDataSource.paginator = this.paginator;
    this.assignmentsDataSource.sort = this.sort;

    this.route.queryParams.subscribe(
      (queryParams) => {
        if (queryParams) {
          //il professore vuole caricare una review
          // if (queryParams.teacherUploadReview) {
          // this.openNewReviewHomeworkDialog(queryParams.teacherUploadReview, queryParams.homeworkStudent)
          // }
          //il professore vuole le versioni di uno studente
          if (queryParams.teacherHomeworkVersions) {
            this.showHomeworkVersionsDialog(queryParams.homeworkAssignment, queryParams.homeworkStudent);
          } //il professore vuole vedere il contenuto di una particolare versione
          else if (queryParams.teacherContentVersion) {
            const assignmentId: number = queryParams.homeworkAssignment;
            const studentId: string = queryParams.homeworkStudent;
            const versionId: number = queryParams.teacherContentVersion;
            console.log('teacher-assignment.components ', assignmentId, ', ', studentId, ', ', versionId)
            this.viewContentHomeworkVersionEvent.emit({ assignmentId, studentId, versionId });
          }
        }
      }
    );
    this.route.queryParams.subscribe((queryParam) =>
      queryParam && queryParam.assignScoreToHomework ? this.openScoreDialog(queryParam.assignScoreToHomework, queryParam.studentId) : null
    );

  }

/*


  openNewReviewHomeworkDialog(assignmentId: number, studentId: string) {
    const dialogRef = this.dialog.open(NewReviewHomeworkDialogComponent, {
      data: {
        assignmetId: assignmentId,
        studentId: studentId,
      }
    });
    dialogRef.afterClosed().pipe(first()).subscribe((homework) => {
        if (homework) {
          const element = this.homeworksInfoStudentsDataSource.data.find(homeworkInfo => homeworkInfo.assignment_id == assignmentId);
          if (element) {
            element.currentStatus = homework.status;
          }
          this.dialog.closeAll();
          this.router.navigate([this.router.url.split('?')[0]]);
        } else {
          this.router.navigate([this.router.url.split('?')[0]], { queryParams: { teacherUploadReview: assignmentId } });
        }
      });
  }


  */

  /**
   * This method is used when the teacher wants to see all homeworks of 
   * a particular assignment
   * @param selectedAssignment 
   */
  showHomeworkInfoStudents(selectedAssignment: Assignment) {
    this.expandedAssignment = this.expandedAssignment === selectedAssignment ? null : selectedAssignment;
    if (this.expandedAssignment === null) {
      return;
    }
    this.homeworksInfoStudentsEvent.emit(selectedAssignment.id);
  }



  changeFilterStatus(status: string) {
    this.filteredStatuses.includes(status) ?
      this.filteredStatuses = this.filteredStatuses.filter(s => s !== status) : this.filteredStatuses.push(status);
  }


  /**
   * This method return true if the teacher can assign a score to an homework
   * @param homeworkInfo 
   */
  scoreAssignableToHomework(homeworkInfo: HomeworkInfoStudent): boolean {
    return !homeworkInfo.score && (homeworkInfo.currentStatus === HomeworkStatus.DEFINITELY_REVIEWED);
  }



  /**
   * Human representation of a date
   * @param date 
   */
  dateToString(date: string): string {
    const newDate = new Date(date);
    return (
      newDate.toLocaleDateString('en-GB') +
      ' at ' +
      newDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
  }



  /**
   * This method open the ViewHomeworkVersionComponent, in this way
   * the teacher cann see all homework versions of a student
   * @param assignmentId 
   * @param studentId 
   */
  showHomeworkVersionsDialog(assignmentId: number, studentId: string) {
    // control if there are other dialogs opened
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    // in questo modo se il prof vuole vedere il contenuto di una versione ho già l'id 
    // dell'assignment e dello studente, con i query params mi prndo l'id di una versione

    // this.selectedAssignmentId = assignmentId;
    // this.selectedStudentId = studentId;
    const dialogRef = this.dialog.open(ViewHomeworkVersionComponent, {
      width: '60%',
      data: {
        assignmentId: assignmentId,
        studentId: studentId
      }
    });
    dialogRef.afterClosed().pipe(first())
      .subscribe((homeworkVersion) => {
        if(homeworkVersion) {
            console.log('sucaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            this.homeworksInfoStudentsEvent.emit(assignmentId)
        } else {
          this.router.navigate([this.router.url.split('?')[0]]);
        }
      })
  }



  /**
   * This method i s used to open a score dialog and send to it
   * some parameters like the ID of the assignment and the ID of the student
   * In this way we can select a unique homework (in a course)
   * @param assignmentId 
   * @param studentId 
   */
  openScoreDialog(assignmentId: number, studentId: string) {
    console.log('open score dialog assignment id ', assignmentId)
    const dialogRef = this.dialog.open(ScoreDialogComponent, {
      data: {
        assignmentId: assignmentId,
        studentId: studentId,
      }
    });
    dialogRef.afterClosed().pipe(first()).subscribe(homework => {
      if (homework) {
        const element = this.homeworksInfoStudentsDataSource.data.find(e =>
          (e.assignment_id == assignmentId) && (e.student_id === studentId)
        );
        element.currentStatus = homework.currentStatus;
        // element.currentStatusToString = res.currentStatusToString;
        element.score = homework.score;
      }
      this.router.navigate([this.router.url.split('?')[0]]);
    });
  }


}
