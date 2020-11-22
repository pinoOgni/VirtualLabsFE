import {Component, ViewChild, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "./auth/login-dialog/login-dialog.component";
import {AuthService} from "./auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{

  @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'VirtualLabs';
  userLogged: boolean;
  email: string;
  routeQueryParams$: Subscription;


  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });
    if(this.isLogged())
      this.email = localStorage.getItem('email');
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

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent); // {disableClose: true}
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      //when the dialog form is closed with cancel
      if(result===false) {
        localStorage.removeItem('to_url');
        this.router.navigate(['.'], {relativeTo: this.route});
      }
      else if(result===true) { //it means the form is closed with login and the user is logged
        this.email = localStorage.getItem('email');
      }
      else {
        localStorage.removeItem('to_url');
        //else, the user click out of the form, so result is undefined. I need to gp to /home
        this.router.navigate(['.'], {relativeTo: this.route});
      }
    });
  }

  logout() {
    this.userLogged = false;
    this.authService.logout();
    this.router.navigate(['home']);
  }

}




