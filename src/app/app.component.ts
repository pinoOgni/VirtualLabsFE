import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './modals/login-dialog/login-dialog.component';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RegisterDialogComponent} from './modals/register-dialog/register-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {EditCourseDialogComponent} from './modals/edit-course-dialog/edit-course-dialog.component';
import {TeacherService} from './services/teacher.service';
import {Course} from './models/course.model';
import {StudentModel} from './models/student.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy{

  @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'VirtualLabs';
  userLogged: boolean;
  email: string;
  routeQueryParams$: Subscription;
  coursesHeldOrAttendend: Course[];

  constructor( private teacherService: TeacherService,
               public dialog: MatDialog,
               private authService: AuthService,
               private router: Router,
               private route: ActivatedRoute) {
    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params.doLogin) {
        this.openDialogLogin();
      }
      else if (params.doRegister) {
        this.openDialogRegister();
      }
      else if (params.doEditCourse){
        this.openDialogEditCourse(this.coursesHeldOrAttendend[params.courseIndex]);
      }
    }
    );
    if (this.isLogged()){
      this.email = localStorage.getItem('email');
    }
    this.coursesHeldOrAttendend = [];
  }

  toggleForMenuClick() {
    this.sidenav.toggle();
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  isLogged(): boolean {
    return this.authService.isUserLogged();
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent); // {disableClose: true}
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      // when the dialog form is closed with cancel
      if (result === false) {
        localStorage.removeItem('to_url');
        this.router.navigate(['.'], {relativeTo: this.route});
      }
      else if (result === true) { // it means the form is closed with login and the user is logged
        this.email = localStorage.getItem('email');
      }
      else {
        localStorage.removeItem('to_url');
        // else, the user click out of the form, so result is undefined. I need to go to /home
        this.router.navigate(['.'], {relativeTo: this.route});
      }
    });
  }

  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent); // {disableClose: true}
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      // when the dialog form is closed with cancel
      if (result === false) {
        localStorage.removeItem('to_url');
        this.router.navigate(['.'], {relativeTo: this.route});
      }
      else {
        localStorage.removeItem('to_url');
        // else, the user click out of the form, so result is undefined. I need to go to /home
        this.router.navigate(['.'], {relativeTo: this.route});
      }
    });
  }

  private openDialogEditCourse(course: Course) {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      data: {
        courseFullName: course.fullName,
        courseAcronym : course.acronym,
        maxStudents: course.maxStudentsForTeam,
        minStudents: course.minStudentsForTeam,
        senabled: course.enabled
      }
    }); // {disableClose: true}

    dialogRef.afterClosed().subscribe(
        result => {
              if ( result.logged === true ){
                const updatedCourse = result.newCourseModel;
                // TODO gestire heldBy
                const editedCourse = new Course(
                    course.id,
                    updatedCourse.acronym,
                    updatedCourse.fullName,
                    Number(updatedCourse.minStudents),
                    Number(updatedCourse.maxStudents),
                    Boolean(updatedCourse.enabled));
              //  this.coursesHeldOrAttendend[ this.coursesHeldOrAttendend.indexOf(course) ] = editedCourse;
                console.log('adesso i corsi sono: ' + this.coursesHeldOrAttendend);
                console.log('sono app.component e l id del corso vale: ' + editedCourse.id);
                this.teacherService.update(editedCourse);
                console.log('ppololobaolo ho fatto la update (?)');
                this.router.navigate(['/home']);
              }
        }
    );

  }

  logout() {
    this.userLogged = false;
    this.authService.logout();
    this.router.navigate(['home']);
  }

  /*
    * Questo metodo è da cambiare con i corsi del prof / student
    * */
  getCourses(){
    this.teacherService.query().subscribe(courses => {
      this.coursesHeldOrAttendend = courses as Course[];
      console.log(this.coursesHeldOrAttendend);
    });

  }

  ngOnInit() {
    this.getCourses();
  }

  ngAfterViewInit() {
    console.log('ciombolomboli' + this.coursesHeldOrAttendend);
  }


}




