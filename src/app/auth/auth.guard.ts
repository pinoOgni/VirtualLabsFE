import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * If the user is not logged in, the login form is opened. 
   * If the user is logged in then the available url is opened
   * @param childRoute 
   * @param state 
   */
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state, childRoute);
  }

  checkLogin(state: RouterStateSnapshot, route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    // control if the user is logged
    if (!currentUser) {
      // in this case the user is not logged, so we need to redirect
      // it will open a login-dialog
      this.router.navigate(['/home'], {
        queryParams: { returnedUrl: state.url, doLogin: true },
      });
      return false;
    }
    if (moment().isBefore(User.getAccessTokenExpireTime(currentUser.token))) {
      console.log('Token is expired!');
      this.authService.logout();
      this.router.navigate(['/home'], {
        queryParams: { returnedUrl: state.url, doLogin: true },
      });
      return false;
    }
    if (route.data.roles && !currentUser.roles.some((r) => route.data.roles.includes(r))) {
      // role not authorised so redirect to home page
      console.log('User', currentUser.username , 'route', state.url);
      this.router.navigate(['/home']);
      return false;
    }
    // authorized
    return true;
  }
}
