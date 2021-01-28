import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { ProposalOfTeam } from 'src/app/models/proposal-of-team.model';
import { Proposal } from 'src/app/models/proposal.model';
import { Student } from 'src/app/models/student.model';
import { Team } from 'src/app/models/team.model';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { TeamService } from 'src/app/services/team.service';


@Component({
  selector: 'app-student-team-cont',
  templateUrl: './student-team.container.html',
})
export class StudentTeamContComponent implements OnInit, OnDestroy {

  /**
   * things to pass to app-student-team: team
   * things to pass to app-student-no-team: proposals, course students who are free, course,
   * requests accepted, requests deleted, requests rejected, options students for the research
   */

   /**
    * This this the team of the currentUser/currentStudent
    * It is used in student-team-component
    */
  team: Team; 

  /**
   * List of proposals for the currentUser
   * This list is used in student-no-team-component
   */
  proposals: Proposal[] = [];

  /**
   * List of enrolled students in a course that are available (not in a team)
   * This list is used in student-no-team-component so a student can select a new member for a new team
   */
  enrolledAvailableStudents: Student[] = [];

  /**
   * currentCourse is used in student-no-team-component to have some info like
   * min and max size of a team and full name of the course
   */
  currentCourse: Course;

  /**
   * list of students for the search. This list is updated each time there
   * is a change and is send to the student-no-team-component
   */
  searchedStudents: Observable<Student[]>;


  /**
   * A Subject is like an Observable, but can multicast to many Observers. 
   * Subjects are like EventEmitters: they maintain a registry of many listeners.
   * Is used for the unsubscription when the component is destroyed
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Criteria emitter: used to refresh optionsStudents each time there is a change 
   */
  private searchOptions = new Subject<string>(); 




  constructor(private router: Router, private teamService: TeamService, private studentService: StudentService, private courseService: CourseService) {}

  ngOnInit(): void {
      /**
       * 1. chiamata a teamService per prendere currentTeamSubject (BehaviorSubject)
       * 2. chiamata a courseService.getEnrolledAvailableStudentss
       * 3. chiamata a courseService.course (BehaviorSubject)
       */

      /**
       * The team variable of this component is taken from the currentTeamSubject
       * that keeps hold of the current value and emits it to any new subscribers as soon as they subscribe.
       * With the asObservable method we creates a new Observable with this Subject as the source.
       * The pipe method is user to make new operators (RxJS)
       * The subscribe() call returns a Subscription object that has an unsubscribe() method
       * The unsubsribe method is used with the destroy$ in OnDestroy method
       */

      //TEST
      /*
      this.teamService.currentTeamSubject
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => (this.team = team));
      */

      /**
       * Call the getEnrolledAvailableStudents to set the enrolledAvailableStudents
       * Then enrolledAvailableStudents is passed to student-no-team-component
       */
      this.courseService
      .getEnrolledAvailableStudents().pipe(first())
      .subscribe((students) => (this.enrolledAvailableStudents = students));

      /**
       * The asObservable method: Creates a new Observable with this Subject as the source. 
       * You can do this to create customize Observer-side logic of the Subject and conceal 
       * it from code that uses the Observable.
       * 
       * In this way the currentCourse is setted
       * Then currentCourse is passed to student-no-team-component
       */
      this.courseService.course
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(course => this.currentCourse = course);
      console.log("student-team-container ", this.currentCourse.fullName);

      /**
       *  the serachedStudents is subscribed to the searchOptions 
       */    
      this.searchedStudents = this.searchOptions.pipe(
      takeUntil(this.destroy$),
      // switch to new search observable each time the term changes
      switchMap((lastname: string) =>
        this.studentService.searchingAvailableStudentsInCourseByLastName(lastname)
      )
    );

    this.getProposals();
      
  }

  /**
  * Unsubscribe 
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /**
   * metodo acceptedTeamProposal che chiama teamService.acceptTeamProposal
   * metodo rejectedTeamProposal che chiama teamService.rejectTeamProposal
   * metodo deletedTeamProposal che chiama teamService.deleteTeamProposal
   * createTeam che chiama teamService.createTeam
   */

  /**
   * retrieve proposals fot his course (courseAcronym)
   * and for this student (using the authentication service )
   */
  getProposals() {
    console.log('getProposals student-team-container')
    this.studentService.getProposalsInCourse()
    .pipe(first()).subscribe((proposals) => (this.proposals = proposals));
  }


  createTeam(proposalOfTeam: ProposalOfTeam): void {
    this.teamService
      .createTeam(this.courseService.currentCourseAcrSubject.value,proposalOfTeam)
      .pipe(first()).subscribe(team => {
        if (team && proposalOfTeam.selectedStudentIds.length === 1) {
          team.members = [];
          team.members.push(this.enrolledAvailableStudents.find(s => s.id === JSON.parse(localStorage.getItem('currentUser')).id));
          this.teamService.currentTeamSubject.next(team);
        }
        this.getProposals();
      });
  }

  /**
   * Thie method is used to push new options in the research 
   * Is used between the container and the student-no-team-component
   * @param lastName 
   */
  searchingStudentsByLastName(lastName: string): void {
    this.searchOptions.next(lastName);
  }


  acceptedTeamProposal(tokenTeam: string) {
  }

  rejectedTeamProposal(tokenTeam: string) {
  }
  deletedTeamProposal(tokenTeam: string) {
  }


}
