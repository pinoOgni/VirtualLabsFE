import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {CourseService} from '../services/course.service';
import {TeamService} from '../services/team.service';

/**
 * The StudentComponent is responsible for the student view (3 tabs: teams, vms, assignments)
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnDestroy {
  /**
   * Is used for the unsubscription when the component is destroyed
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  /**
   * links used in student-component.html in ngFor to go to the correct tab
   */
  studentLinks = [
    { label: 'Teams', path: 'teams' },
    { label: 'Vms', path: 'vms' },
    { label: 'Assignments', path: 'assignments' },
  ];
  constructor(private authService: AuthService, private route: ActivatedRoute, private courseService: CourseService, private teamService: TeamService) {
    /**
     * Take the acronym of the course from the route
     */
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.courseService.setNextCourse(params.courseId);
      console.log('setNextCourse ', params.courseId)
      this.teamService
          .getTeamOfStudent()
        .pipe(first()).subscribe(team => team ? this.teamService.currentTeamSubject.next(team) : this.teamService.currentTeamSubject.next(null));
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    this.courseService.setNextCourse(null);
    this.teamService.currentTeamSubject.next(null);
  }
}
