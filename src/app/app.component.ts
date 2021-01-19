import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "./modals/login-dialog/login-dialog.component";
import { AuthService } from "./auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { RegisterDialogComponent } from './modals/register-dialog/register-dialog.component';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ViewChild('sidenav') sidenav: MatSidenav;

  //title = 'VirtualLabs';
  //userLogged: boolean;
  //email: string;
  routeQueryParams$: Subscription;


  currentUser: User;
  course: Course;
  courses: Observable<Course[]>;
  navBarOpened = false;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    // Here we subscribe to the currentUser and then call the refillCourses method
    this.authService.getCurrentUserserObservable().subscribe((u: User) => {
      this.currentUser = u;
      //this.refillCourses();
      if (u)
        this.navBarOpened = true;
    });

    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['doLogin']) {
        this.openDialogLogin();
      }
      else if (params['doRegister']) {
        this.openDialogRegister();
      }
    });

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
        this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home',]);
        this.navBarOpened = true;
      }
      else if (latestUrl === this.router.url)
        this.router.navigate(['/home']);
    });
  }


  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent); // {disableClose: true}
    const latestUrl = this.router.url;
    dialogRef.afterClosed().pipe(first()).subscribe(res => {
      if (res) {
        this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home',]);
        this.navBarOpened = true;
      }
      else if (latestUrl === this.router.url)
        this.router.navigate(['/home']);
    });
  }

  logout() {
    this.dialog.closeAll();
    this.course = null;
    this.navBarOpened = false;
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}




