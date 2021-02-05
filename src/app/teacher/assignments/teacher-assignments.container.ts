import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CreateAssignmentComponent } from 'src/app/modals/create-assignment/create-assignment.component';
import { ViewContentAssignmentComponent } from 'src/app/modals/view-content-assignment/view-content-assignment.component';
import { Assignment } from 'src/app/models/assignment.model';
import { HomeworkInfoStudent } from 'src/app/models/homework-info-student.model';
import { HomeworkVersion } from 'src/app/models/homework-version.model';
import { Homework } from 'src/app/models/homework.model';
import { Student } from 'src/app/models/student.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { ViewContentHomeworkVersionComponent } from 'src/app/view-content-homework-version/view-content-homework-version.component';

/**
 * this represents the container fot the teacher-assignements view component
 */
@Component({
  selector: 'app-teacher-assignments-cont',
  templateUrl: './teacher-assignments.container.html',
})
export class TeacherAssignmentsContComponent {

  /**
   * List of all assignments of this course
   * With one get to the server
   */
  assignments: Assignment[] = [];


  homeworksInfoStudents: HomeworkInfoStudent[] = [];


  constructor(private studentService: StudentService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private courseService: CourseService, private assignmentService: AssignmentService) {
    /**
     * subscribe, in this way we can open a dialog using the "createAssignment" queryparam
     */
    this.route.queryParams.subscribe((queryParam) => queryParam && queryParam.createAssignment ? this.openCreateAssignmentDialog() : null);

    /**
     * get the list of assignments of this course
     * then subscribe, in this way we can open a dialog using the "teacherContentAssignment" queryparam
     * used whe the teacher click an icon to see the content of an assignment
     */
    this.courseService.getAssignmentsOfCourse(this.courseService.currentCourseIdSubject.value)
      .pipe(first()).subscribe(assignments => {
        this.assignments = assignments;
        this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.teacherContentAssignment ? this.openViewContentAssignmentDialog(queryParam.teacherContentAssignment) : null);
      });
  }

  /**
   * this method is used to open the create assignment dialog
   */
  openCreateAssignmentDialog() {
    const dialogRef = this.dialog.open(CreateAssignmentComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().pipe(first()).subscribe(
      (a) => {
        if (a) {
          //put the new assignment in the list of the assignments of this course
          this.assignments.push(a);
          this.assignments = this.assignments.slice()
        }
        this.router.navigate([this.router.url.split('?')[0]]);
      }
    )
  }

  /**
   * This method is used to display the content of an assignment
   * @param assignmentId
   */
  openViewContentAssignmentDialog(assignmentId: string) {
    const assignment = this.assignments.find(a => a.id.toString() === assignmentId);
    this.assignmentService.getContentAssignment(assignment.id).pipe(first()).subscribe(c => {
      if (!c) {
        this.router.navigate([this.router.url.split('?')[0]]);
        return;
      }
      const url = URL.createObjectURL(c);
      const dialogRef = this.dialog.open(ViewContentAssignmentComponent, {
        data: {
          assignmentId: assignment.id,
          name: assignment.name,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        URL.revokeObjectURL(url);
        this.router.navigate([this.router.url.split('?')[0]]);
      });
    });
  }



  /**
   * This method first retrieve all homeworks of an assignment
   * then retrieve all info about a student fot that assignment
   * @param assignmentId 
   */
  getHomeworksInfoStudents(assignmentId: number) {
    /**
     * List of all homeworks of this course
     * with one get
     */
    let homeworks: Homework[] = [];

    this.assignmentService.getHomeworksOfAssignment(assignmentId).pipe(first()).subscribe(
      solutions => homeworks = solutions.sort(Homework.compareHomework));
    homeworks.forEach(homework =>
      this.studentService.getStudent(homework.student_id).pipe(first()).subscribe(
        (x) => this.homeworksInfoStudents.push({
          assignment_id: assignmentId, student_id: x.id,
          studentName: x.firstName, studentLastName: x.lastName,
          currentStatus: homework.currentStatus,
          currentStatusToString: homework.currentStatus.toString(),
          score: homework.score
        })
      ));
  }


  viewContentHomeworkVersion(object: any) {
    this.assignmentService.getContentHomeworkVersion(object.assignmentId,object.studentId,object.versionId)
    .pipe(first()).subscribe(content => {
      if (!content) {
        this.router.navigate([this.router.url.split('?')[0]], {queryParams: {solution: object.solId}});
        return;
      }
      const url = URL.createObjectURL(content);
      const dialogRef = this.dialog.open(ViewContentHomeworkVersionComponent, {
        data: {
          version_id: object.versionId
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        URL.revokeObjectURL(url);
        this.router.navigate([this.router.url.split('?')[0]], {queryParams: {solution: object.solId}});
      });
    });
  }


}