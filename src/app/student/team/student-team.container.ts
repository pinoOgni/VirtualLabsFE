import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, flatMap, map, mergeMap, switchMap, takeUntil, toArray } from 'rxjs/operators';
import { TeamMembersDialogComponent } from 'src/app/modals/team-members-dialog/team-members-dialog.component';
import { Course } from 'src/app/models/course.model';
import { ProposalInfo } from 'src/app/models/proposal-info.model';
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
   * This is the team of the currentUser/currentStudent
   * It is used in student-team-component
   */
  team: Team;

  /**
   * List of the students of a team
   * In the team that we retrieve from there is only
   * the list of the student Ids not the entire students
   */
  membersOfTeam: Student[] = [];

  /**
   * List of proposals received for the currentUser
   * This list is used in student-no-team-component
   */
  proposalsInfoReceived: ProposalInfo[] = [];

  /**
   * List of proposals sent by the currentUser
   * This list is used in student-no-team-component
   */
  proposalsInfoSent: ProposalInfo[] = [];

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
   * Criteria emitter: used to refresh searchedStudents each time there is a change 
   */
  private searchOptions = new Subject<string>();




  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private teamService: TeamService, private studentService: StudentService, private courseService: CourseService) {

    this.route.queryParams.subscribe((queryParam) =>
      queryParam && queryParam.membersAndState ? this.openViewMembersTeamDialog(queryParam.membersAndState, queryParam.teamName, queryParam.typeProposal) : null);

  }

  ngOnInit(): void {
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
      .subscribe(course => {
        this.currentCourse = course;
      }
      );


    /**
     * The team variable of this component is taken from the currentTeamSubject
     * that keeps hold of the current value and emits it to any new subscribers as soon as they subscribe.
     * With the asObservable method we creates a new Observable with this Subject as the source.
     * The pipe method is user to make new operators (RxJS)
     * The subscribe() call returns a Subscription object that has an unsubscribe() method
     * The unsubsribe method is used with the destroy$ in OnDestroy method
     */

    this.teamService.currentTeamSubject
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => {
        this.team = team;
        if (team != null) {
          this.teamService.getMembersOfTeam(team.id).pipe(first())
            .subscribe((members) => (this.membersOfTeam = members));
        }
      }
      );


    /**
     * Call the getEnrolledAvailableStudents to set the enrolledAvailableStudents
     * Then enrolledAvailableStudents is passed to student-no-team-component
     */
    this.courseService
      .getEnrolledAvailableStudentsForCourse().pipe(first())
      .subscribe((students) => (this.enrolledAvailableStudents = students));

    /**
     *  the searchedStudents is subscribed to the searchOptions 
     */
    this.searchedStudents = this.searchOptions.pipe(
      takeUntil(this.destroy$),
      // switch to new search observable each time the term changes
      switchMap((name: string) =>
        this.studentService.searchingAvailableStudentsInCourseByName(name)
      )
    );
    /**
     * Take all the proposals of this course for the the student
     */
    this.getProposalsReceived();
    this.getProposalsSent();

  }

  /**
  * Unsubscribe 
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  openViewMembersTeamDialog(proposalInfoId: number, teamName: string, typeProposal: string) {
    let proposalInfo
    if (typeProposal === 'received') {
      proposalInfo = this.proposalsInfoReceived.find(p => p.id == proposalInfoId);
    } else if (typeProposal === 'sent') {
      proposalInfo = this.proposalsInfoSent.find(p => p.id == proposalInfoId);
    }
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    const dialogRef = this.dialog.open(TeamMembersDialogComponent, {
      width: '60%',
      data: {
        proposalInfo: proposalInfo,
        teamName: teamName,
      }
    });
    dialogRef.afterClosed().pipe(first())
      .subscribe(() => {
        this.router.navigate([this.router.url.split('?')[0]]);
      })
  }

  /**
   * retrieve proposals fot his course (courseAcronym)
   * and for this student (using the authentication service )
   */

  getProposalsReceived() {
    this.studentService.getProposalsReceivedInCourse().pipe(
      first(),
      flatMap(x => x),
      mergeMap(proposalNotification => {
        let proposalInfo = new ProposalInfo();
        proposalInfo.membersWithStatus = proposalNotification.studentsInvitedWithStatus;
        proposalInfo.teamName = proposalNotification.teamName;
        proposalInfo.token = proposalNotification.token;
        proposalInfo.deadline = proposalNotification.deadline;
        proposalInfo.id = proposalNotification.id;
        return this.teamService.getCreatorOfTeam(proposalNotification.id).pipe(
          map(creator => ({
            creator, proposalInfo
          })),
          map(middleMerge => {
            middleMerge.proposalInfo.creator = middleMerge.creator.firstName + " " + middleMerge.creator.lastName + " " + middleMerge.creator.id
            return middleMerge.proposalInfo;
          })
        )
      }), toArray()
    ).subscribe(
      (last) => {
        this.proposalsInfoReceived = last;
      }
    )
  }


  getProposalsSent() {
    this.studentService.getProposalsSentInCourse().pipe(
      first(),
      flatMap(x => x),
      mergeMap(proposalNotification => {
        let proposalInfo = new ProposalInfo();
        proposalInfo.membersWithStatus = proposalNotification.studentsInvitedWithStatus;
        proposalInfo.teamName = proposalNotification.teamName;
        proposalInfo.token = proposalNotification.token;
        proposalInfo.deadline = proposalNotification.deadline;
        proposalInfo.id = proposalNotification.id;
        return this.teamService.getCreatorOfTeam(proposalNotification.id).pipe(
          map(creator => ({
            creator, proposalInfo
          })),
          map(middleMerge => {
            middleMerge.proposalInfo.creator = middleMerge.creator.firstName + " " + middleMerge.creator.lastName + " " + middleMerge.creator.id
            return middleMerge.proposalInfo;
          })
        )
      }), toArray()
    ).subscribe(
      (last) => {
        this.proposalsInfoSent = last;
      }
    )
  }


  /**
   * This method is used to create a proposal of team
   * @param proposalOfTeam 
   */
  createTeam(proposalOfTeam: ProposalOfTeam): void {
    this.teamService
      .createTeam(this.courseService.currentCourseIdSubject.value, proposalOfTeam)
      .pipe(first()).subscribe(proposal => {
        if (proposal && proposalOfTeam.selectedStudentsId.length === 1) {
            // TODO?
        }
        this.getProposalsSent();
        this.router.navigate([this.router.url.split('?')[0]]);
      });
  }

  /**
   * Thie method is used to push new options in the research 
   * Is used between the container and the student-no-team-component
   * @param name 
   */
  searchingStudentsByName(name: string): void {
    this.searchOptions.next(name);
  }


  acceptedTeamProposal(tokenTeam: string) {
    this.teamService.acceptTeamProposal(tokenTeam)
      .pipe(first())
      .subscribe(r => {
        if (r) {
          this.teamService
            .getTeamOfStudent()
            .pipe(first())
            .subscribe((team) => this.teamService.currentTeamSubject.next(team));
          this.router.navigate([this.router.url]);
        }
        this.getProposalsReceived();
      });
  }

  rejectedTeamProposal(tokenTeam: string) {
    this.teamService
      .rejectTeamProposal(tokenTeam).pipe(first())
      .subscribe(() => this.getProposalsReceived());
  }

  deletedTeamProposal(tokenTeam: string) {
    this.teamService
      .deleteProposal(tokenTeam).pipe(first())
      .subscribe(() => this.getProposalsReceived());
  }


}
