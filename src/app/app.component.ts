import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './modals/login-dialog/login-dialog.component';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {RegisterDialogComponent} from './modals/register-dialog/register-dialog.component';
import {User} from './models/user.model';
import {Course} from './models/course.model';
import {first, tap} from 'rxjs/operators';
import {EditCourseDialogComponent} from './modals/edit-course-dialog/edit-course-dialog.component';
import {TeacherService} from './services/teacher.service';
import {StudentService} from './services/student.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit{

  // @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'VirtualLabs';
  routeQueryParams$: Subscription;


  currentUser: User;
  course: Course;
  courses: Observable<Course[]>;
  navBarOpened = false;

  constructor(
      private teacherService: TeacherService,
      private studentsService: StudentService,
      public dialog: MatDialog,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute) {
    // Here we subscribe to the currentUser and then call the refillCourses method
    this.authService.getCurrentUserserObservable().subscribe((u: User) => {
      this.currentUser = u;
      if (u) {
        this.navBarOpened = true;
        this.refillCourses();
      }
    });

    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params.doLogin) {
        this.openDialogLogin();
      }
      else if (params.doRegister) {
        this.openDialogRegister();
      }
    });

  }

  ngOnInit(): void {
//    this.refillCourses();

  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  openDialogLogin() {
    const latestUrl = this.router.url;
    const dialogRef = this.dialog.open(LoginDialogComponent); // {disableClose: true}
    // First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent
    dialogRef.afterClosed().pipe(first()).subscribe(res => {
      if (res) {
        this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home', ]);
        this.navBarOpened = true;

      }
      else if (latestUrl === this.router.url) {
        this.router.navigate(['/home']);
 }
    });
  }


  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent); // {disableClose: true}
    const latestUrl = this.router.url;
    dialogRef.afterClosed().pipe(first()).subscribe(res => {
      if (res) {
        this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home', ]);
        this.navBarOpened = true;
      }
      else if (latestUrl === this.router.url) {
        this.router.navigate(['/home']);
 }
    });
  }

  logout() {
    this.dialog.closeAll();
    this.course = null;
    this.navBarOpened = false;
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public openDialogEditCourse(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      data: {
        courseFullName: course.fullName,
        courseAcronym : course.acronym,
        maxStudents: course.maxStudentsForTeam,
        minStudents: course.minStudentsForTeam,
        enabled: course.enabled
      }
    }); // {disableClose: true}

    dialogRef.afterClosed().subscribe(
        result => {
          if (result === undefined ){
            return;
          }
          if ( result.logged === true ){
            const updatedCourse = result.newCourseModel;
            // TODO gestire heldBy
            const editedCourse = new Course(
                updatedCourse.acronym,
                updatedCourse.fullName,
                updatedCourse.minStudentsForTeam,
                updatedCourse.maxStudentsForTeam,
                Boolean(updatedCourse.enabled));
            this.teacherService.update(editedCourse).subscribe(
                r => {
                    this.refillCourses();
                }
            );
            this.router.navigate(['/home']);
          }
        }
    );

  }

  private refillCourses() {
    if (this.currentUser){
      if ( this.currentUser.roles.includes('ROLE_STUDENT')){
        console.log("refill courses role student")
       this.courses =  this.studentsService.getCoursesOfStudentById()
            .pipe(
              tap(() =>
              console.log(`refill courses  getCoursesOfStudentById `, this.courses)
            ),
            );
      }
      else if ( this.currentUser.roles.includes('ROLE_TEACHER')){
        console.log("refill courses role teacher")
        this.courses = this.teacherService.getCoursesOfTeacherById()
            .pipe(
              tap(() =>
              console.log(`refill courses  getCoursesOfTeacherById `, this.courses)
            ),
            );
      }
    }
  }
}




