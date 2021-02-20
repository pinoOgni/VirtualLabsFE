import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AuthService} from '../auth/auth.service';
import {ProposalOfTeam} from '../models/proposal-of-team.model';
import {Student} from '../models/student.model';
import {Team} from '../models/team.model';
import {CourseService} from './course.service';
import {TeamStatus} from '../models/team-status';
import { Proposal } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // test
  exampleTeam: Team = new Team('New Team', 2, 1, 1, 1, 1, 1, 1, TeamStatus.ACTIVE);

  // test
  exampleMembers: Student[] = [
    {id: 's123456', email: 'string', firstName: 'Giacomo', lastName: 'Leopardi', avatar: 'string'},
    {id: 's987654', email: 'string', firstName: 'Alessandro', lastName: 'Manzoni', avatar: 'string'}
  ]

   /**
   * The RxJS BehaviorSubject is a special type of Subject that 
   * keeps hold of the current value and emits it to any new 
   * subscribers as soon as they subscribe, while regular 
   * Subjects don't store the current value and only emit 
   * values that are published after a subscription is created
   */
  public currentTeamSubject: BehaviorSubject<Team>;
  

  constructor(private httpClient: HttpClient, private authService: AuthService, private courseService: CourseService) { 
    this.currentTeamSubject = new BehaviorSubject<Team>(null);
  }

  /**
   * TODO
   * updateTeamVmResources: aggiorna le risorse di un team da parte di un teacher. Prende un FORM e un teamId. Ritorna Observable<Team>
   */

   /**
    * This method get the team of a student 
    * @param courseId the acronym of a team
    * @param studentId the student id that is equal of the user username of a user logged
    */
  getTeamOfStudent(courseId: number = this.courseService.currentCourseIdSubject.value, studentId: string = this.authService.currentUserValue.username): Observable<Team> {
    // test
    // return of(this.exampleTeam);
    // return of(null);
     const url = `${environment.base_url_students}/${studentId}/courses/${courseId}/team`
    return this.httpClient
    .get<Team>(url).pipe(
        tap(() =>
            console.log(`getTeamOfStudent ok studentId ${studentId} course ${courseId}`
            )
        ),
        catchError(
            this.handleError<Team>(`getTeamOfStudent error studentId ${studentId} course ${courseId}`)
        )
    );
}

/**
 * This method is used to get the members of a team
 * @param teamId 
 * @param courseId 
 */
getMembersOfTeam(teamId: number, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Student[]> {
  // this method will done a get
  // test
  // return of(this.exampleMembers);
     const url = `${environment.base_url_course}/${courseId}/teams/${teamId}/students`
  return this.httpClient
  .get<Student[]>(url).pipe(
      tap(() =>
          console.log(`getMembersOfTeam ok teamId ${teamId} course ${courseId}`
          )
      ),
      catchError(
          this.handleError<Student[]>(`getMembersOfTeam error teamId ${teamId} course ${courseId}`,[])
      )
  );
}

/**
 * This method is used to retrieve all members of a proposal of a team
 * @param proposalId 
 * @param courseId 
 */
getMembersOfProposalNotification(proposalId: number, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Student[]> {
  const url = `${environment.base_url_course}/${courseId}/proposalNotifications/${proposalId}/members`
  return this.httpClient
  .get<Student[]>(url).pipe(
      tap(() =>
          console.log(`getMembersOfProposalNotification ok studentId ${proposalId} course ${courseId}`
          )
      ),
      catchError(
          this.handleError<Student[]>(`getMembersOfProposalNotification error studentId ${proposalId} course ${courseId}`,[])
      )
  );
}

  /**
   * This method create a team given a course and a proposal of team
   * @param courseId the acronym of a course
   * @param proposalOfTeam proposal of a team
   */
  createTeam(courseId: number, proposalOfTeam: ProposalOfTeam): Observable<Proposal> {
    console.log('create team ', proposalOfTeam)
    const url = `${environment.base_url_course}/${courseId}/teams`
    return this.httpClient.post<Proposal>(url,proposalOfTeam)
        .pipe(tap(() =>
                console.log(`createTeam ${proposalOfTeam.teamName}`)
            ),
            catchError(this.handleError<Proposal>(`createTeam ${proposalOfTeam.teamName}`) )
        );
  }

/**
 * This method is used to get the creator of a team
 * @param proposalId 
 * @param studentId 
 * @param courseId 
 */
getCreatorOfTeam(proposalId: number, studentId: string = this.authService.currentUserValue.username, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Student> {
  const url = `${environment.base_url_course}/${courseId}/proposalNotifications/${proposalId}/creator`
 return this.httpClient.get<Student>(url)
     .pipe(
       tap((homeworks) => console.log(`getCreatorOfTeam ok ${proposalId}`)),
       catchError(this.handleError<Student>(`getCreatorOfTeam error ${proposalId}`)));
}


  /**
   * This will accept the proposal of a team
   * @param tokenTeam the token associated to the team proposal
   */
  acceptTeamProposal(tokenTeam: string):  Observable<boolean> {
    const url = `${environment.base_url_notifications}/confirm/${tokenTeam}`
    return this.httpClient.get<boolean>(url)
    .pipe(tap(() =>
    console.log(`acceptTeamProposal() ok ${tokenTeam}`)
    ),
    catchError(this.handleError<boolean>(`acceptTeamProposal error ${tokenTeam}`))
    );
  } 

  /**
   * This will reject the proposal of a team
   * @param tokenTeam the token associated to the team proposal
   */
  rejectTeamProposal(tokenTeam: string):  Observable<boolean> {
    const url = `${environment.base_url_notifications}/reject/${tokenTeam}`
    return this.httpClient.get<boolean>(url)
    .pipe(tap(() =>
    console.log(`rejectTeamProposal() ok ${tokenTeam}`)
    ),
    catchError(this.handleError<boolean>(`rejectTeamProposal error ${tokenTeam}`))
    );
  } 
  /**
   * This will delete the proposal 
   * @param tokenTeam the token associated to the team proposal
   */
  public deleteProposal(tokenTeam: string): Observable<boolean> {
    const url = `${environment.base_url_teams}/deleteTeamProposal/${tokenTeam}`
    return this.httpClient.get<boolean>(url,environment.http_options)
      .pipe(
        tap(() => console.log(`deleteProposal ok ${tokenTeam}`)),
        catchError(this.handleError<boolean>(`deleteProposal error ${tokenTeam}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
