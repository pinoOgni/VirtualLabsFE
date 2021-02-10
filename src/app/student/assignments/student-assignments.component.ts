import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NewHomeworkVersionDialogComponent } from 'src/app/modals/new-homework-version-dialog/new-homework-version-dialog.component';
import { AssignmentHomeworkStudent } from 'src/app/models/assignment-homework-student.model';
import { Assignment } from 'src/app/models/assignment.model';
import { HomeworkVersion } from 'src/app/models/homework-version.model';
import { HomeworkStatus } from 'src/app/models/homework.model';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentAssignmentsComponent {

  /**
   * boolean variable to know if the student can upload a new version for that homework
   */
  canUploadNewVersion: boolean;



  selectedAssignmentId: number;

  /** 
   * data source for the list of assignments
   */
  assignmentHomeworksDataSource = new MatTableDataSource<AssignmentHomeworkStudent>();


  /**
   * data source for the list of versions
   */
  versionsDataSource = new MatTableDataSource<HomeworkVersion>();


  /**
   * columns for the table of assignemtns
   */
  assignmentHomeworksColumnsToDisplay = ['name','releaseDate','expiryDate','currentStatus','score','content','versions'];

  /**
   * columns for the table of the homework versions
   */
  versionsColumnsToDisplay = ['versionStatus', 'timestamp', 'content']

  /**
   * expanded element for the table
   */
  expandedAssignmentHomework: AssignmentHomeworkStudent | null;

  /**
   * set the list of assignments from the container
   */
  @Input() set assignmentHomeworks(assignmentHomeworks: AssignmentHomeworkStudent[]) {
    this.assignmentHomeworksDataSource.data = assignmentHomeworks;
  }

  /**
   * set the list of the versions from the container
   */
  @Input() set versions(versions: HomeworkVersion[]) {
    this.versionsDataSource.data = versions.sort(HomeworkVersion.compareHomeworkVersion);
  }

  /**
   * emitter fot the homework versions
   */
  @Output() getHomeworkVersionEvent = new EventEmitter<number>();

  /**
   * emitter for the homework versions, to update them
   */
  @Output() refillHomeworkVersionsEvent = new EventEmitter<number>();


  constructor(public spinnerService: SpinnerService, public dialog: MatDialog,private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((queryParams) =>
    queryParams && queryParams.studentNewVersion ? this.newHomeworkVersion(queryParams.studentNewVersion) : null
    );
   }



   showHomeworkVersions(selected: AssignmentHomeworkStudent) {
    this.expandedAssignmentHomework = this.expandedAssignmentHomework === selected ? null : selected;
    if (this.expandedAssignmentHomework === null) {
      return;
    }
    this.canUploadNewVersion = selected.currentStatus === HomeworkStatus.READ || selected.currentStatus === HomeworkStatus.REVIEWED;
    this.getHomeworkVersionEvent.emit(selected.assignment_id);
  }
  

  /**
   * This method is used to open a new dialog and to give the 
   * possibility to upload a new version of a homework for a given assignment
   * @param assignmentId 
   */
  newHomeworkVersion(assignmentId: number) {
    console.log('newHomeworkVersion')
    const dialogRef = this.dialog.open(NewHomeworkVersionDialogComponent, {
      width: '60%',
        data: { 
          assignmentId: assignmentId,
          assignmentName: this.expandedAssignmentHomework.name
        }
      });
  dialogRef.afterClosed().pipe(first()).subscribe((result) => {
        if (result) {
          this.refillHomeworkVersionsEvent.emit(this.expandedAssignmentHomework.assignment_id);
          this.expandedAssignmentHomework.currentStatus = HomeworkStatus.SUBMITTED;
          // this.expandedAssignmentHomework.currentStatusTs = result.timestamp;
          this.canUploadNewVersion = false;
        }
        this.router.navigate([this.router.url.split('?')[0]]);
      });
  }
  

  dateToString(date: string): string {
    const newDate = new Date(date);
    return (
      newDate.toLocaleDateString('en-GB') +
      ' at ' +
      newDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
  }



}
