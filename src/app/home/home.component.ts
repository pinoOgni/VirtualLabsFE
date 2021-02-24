import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    /**
     * Represents the currently logged in user
     */
    currentUser: User;

  constructor(private authService: AuthService) {

    /**
     * Here we subscribe to the currentUser and then call the refillCourses method
    */
    this.authService.getCurrentUserserObservable().subscribe((u: User) => {
      this.currentUser = u;
    });
   }

}
