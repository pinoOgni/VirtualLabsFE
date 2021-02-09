import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { HomeworkVersion } from 'src/app/models/homework-version.model';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.css']
})
export class StudentAssignmentsComponent implements AfterViewInit {


  selectedAssignmentId: number;

  /** 
   * data source for the list of assignments
   */
  assignmentsDataSource = new MatTableDataSource<Assignment>();

  versionsDataSource = new MatTableDataSource<HomeworkVersion>();


  assignmentColumnsToDisplay = ['name','releaseDate','expiryDate','content','versions'];

  versionsColumnsToDisplay = ['currentStatus', 'score','content']


  expandedAssignment: Assignment | null;

  @Input() set assignments(assignments: Assignment[]) {
    this.assignmentsDataSource.data = assignments.sort(Assignment.compareAssignment);
  }

  @Input() set versionsStudents(versionsStudents: HomeworkVersion[]) {
    this.versionsDataSource.data = versionsStudents;
  }

  @Output() versionStudentsEvent = new EventEmitter<number>();

  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  constructor(public dialog: MatDialog,private router: Router, private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.assignmentsDataSource.sort = this.sort;

  }


  showHomeworkInfoStudents(selectedVersion: HomeworkVersion) {
  }



  dateToString(date: string): string {
    const newDate = new Date(date);
    return (
      newDate.toLocaleDateString('en-GB') +
      ' at ' +
      newDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
  }


  canUploadNewVersion(): boolean {
    return true;
  }


}
