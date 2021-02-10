import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { version } from 'moment';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ViewContentAssignmentComponent } from 'src/app/modals/view-content-assignment/view-content-assignment.component';
import { AssignmentHomeworkStudent } from 'src/app/models/assignment-homework-student.model';
import { HomeworkVersion } from 'src/app/models/homework-version.model';
import { HomeworkStatus } from 'src/app/models/homework.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { ViewContentHomeworkVersionComponent } from 'src/app/modals/view-content-homework-version/view-content-homework-version.component';


@Component({
  selector: 'app-student-assignments-cont',
  templateUrl: './student-assignments.container.html'
})
export class StudentAssignmentsContComponent {

  /**
   * List of assignment+homework, this will be displayed in the component
   */
  assignmentHomeworks: AssignmentHomeworkStudent[] = [];


  /**
   * List of all homework versions for a given assignment
   * of the student logged for a particular course
   */
  homeworkVersions: HomeworkVersion[] = [];




  constructor(private authService: AuthService, private courseService: CourseService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
    private assignmentService: AssignmentService){

      this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.studentContentVersion ? this.openViewContentHomeworkVersionDialog(queryParam.studentContentVersion, queryParam.homeworkAssignment) : null
  );


     this.courseService.getAssignmentHomeworks().pipe(first()).subscribe(assignmentHomeworks => {
       this.assignmentHomeworks = assignmentHomeworks;
       this.route.queryParams.subscribe((queryParam) => 
       queryParam && queryParam.studentContentAssignment ? this.openViewContentAssignmentDialog(queryParam.studentContentAssignment) : null );
     })

  }

  /**
   * This method is used to retrieve all homework versions 
   * @param assignmentId 
   */
  refillHomeworkVersions(assignmentId: number) {
    this.assignmentService.getHomeworkVersionsOfStudent(assignmentId,this.authService.currentUserValue.username)
        .pipe(first()).subscribe((versions) => {
          this.homeworkVersions = versions;
        });
  }

  getHomeworkVersions(assignmentId: number) {
    this.assignmentService.getHomeworkVersionsOfStudent(assignmentId,this.authService.currentUserValue.username)
        .pipe(first()).subscribe((versions) => {
          this.homeworkVersions = versions;
        });
  }



  private refillAssignmentHomeworks() {
    this.courseService.getAssignmentHomeworks().pipe(first()).subscribe(assignmentHomework => {
      
      this.assignmentHomeworks = assignmentHomework;
    }
    );
  }













    /**
   * This method is used to display the content of an assignment
   * @param assignmentId
   */
  openViewContentAssignmentDialog(assignmentId: number) {
    const assignment = this.assignmentHomeworks.find(a => a.assignment_id == assignmentId);
    this.assignmentService.getContentAssignment(assignment.assignment_id).pipe(first()).subscribe(c => {
      if (!c) {
        this.router.navigate([this.router.url.split('?')[0]]);
        return;
      }
      console.log('blob text', c.text())
      const url = URL.createObjectURL(c);
      const dialogRef = this.dialog.open(ViewContentAssignmentComponent, {
        // height: '60%',
        // width: '60%',
        data: {
          content: c.text(),
          type: c.type,
          assignmentUrl: url,
          name: assignment.name,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        URL.revokeObjectURL(url);
        if (assignment.currentStatus === HomeworkStatus.NULL) {
          this.refillAssignmentHomeworks();
        }
        this.router.navigate([this.router.url.split('?')[0]]);
      });
    });
  }

  /**
   * Thie method is used to open the ViewContentHomeworkVersionDialog,
   * in this way a student can see and also download a particular version
   * of a given homework
   * @param versionId 
   * @param assignmentId 
   */
  openViewContentHomeworkVersionDialog(versionId: number, assignmentId: number) {
    const assignment = this.assignmentHomeworks.find(a => a.assignment_id == assignmentId);
    console.log('viewContentHomeworkVersion ', assignment)
    this.assignmentService.getContentHomeworkVersion(assignmentId,this.authService.currentUserValue.username, versionId)
    .pipe(first()).subscribe(content => {
      if (!content) {
        this.router.navigate([this.router.url.split('?')[0]]);
        return;
      }
      const url = URL.createObjectURL(content);
      const dialogRef = this.dialog.open(ViewContentHomeworkVersionComponent, {
        data: {
          content: content.text(),
          type: content.type,
          homeworkVersionUrl: url,
          homeworkVersionName: this.authService.currentUserValue.username + "_Assignment_" + assignment.name + "_VersionId_" + versionId
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        URL.revokeObjectURL(url);
        this.router.navigate([this.router.url.split('?')[0]]);
      });
    });
  }

  
}

