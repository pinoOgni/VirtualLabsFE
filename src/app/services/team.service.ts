import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ProposalOfTeam } from '../models/proposal-of-team.model';
import { Student } from '../models/student.model';
import { Team } from '../models/team.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

    /**
   * list of students used for test, instead of use the json-auth-server
   */
  members: Student[] = [
    {id: "1", email: "string", firstName: "pino", lastName: "ogni"},
    {id: "2", email: "string", firstName: "ale", lastName: "pag"} 
  ];

  //test
  newMembers: Student[] = [
    {id: "9", email: "string", firstName: "giacomo", lastName: "carlo"},
    {id: "10", email: "string", firstName: "beppe", lastName: "olio"} 
  ];

  //test
  exampleTeam: Team = new Team("New Team", 2,1,1,1,1,1,1,true)

   /**
   * The RxJS BehaviorSubject is a special type of Subject that 
   * keeps hold of the current value and emits it to any new 
   * subscribers as soon as they subscribe, while regular 
   * Subjects don't store the current value and only emit 
   * values that are published after a subscription is created
   */
  public currentTeamSubject: BehaviorSubject<Team>; 
  constructor(private httpClient: HttpClient, private authService: AuthService, private courseService: CourseService) { 
    //test
    //this.currentTeamSubject = new BehaviorSubject<Team>(new Team("Argonauti", 1, this.members,1,1,1,1,1,1,true));
    this.currentTeamSubject = new BehaviorSubject<Team>(null)
  }

  /**
   * TODO
   * updateTeamVmResources: aggiorna le risorse di un team da parte di un teacher. Prende un FORM e un teamId. Ritorna Observable<Team>
   */

   /**
    * This method get the team of a student 
    * @param courseAcronym the acronym of a team
    * @param studentId the student id that is equal of the user username of a user logged
    */
  getTeamOfStudent(courseAcronym: string = this.courseService.currentCourseAcrSubject.value, studentId: string = this.authService.currentUserValue.username): Observable<Team> {
    //this method will done a get
    //test
    //return from(this.currentTeamSubject);
    const url = `${environment.base_url_students}/${studentId}/teams/${courseAcronym}`
    return this.httpClient
    .get<Team>(url).pipe(
        tap(() =>
            console.log(`getTeamOfStudent ok studentId ${studentId} course ${courseAcronym}`
            )
        ),
        catchError(
            this.handleError<Team>(`getTeamOfStudent error studentId ${studentId} course ${courseAcronym}`)
        )
    );
}


getMembersOfTeam(teamId: string, courseAcronym: string = this.courseService.currentCourseAcrSubject.value): Observable<Student[]> {
  //this method will done a get
  //test
  //return from(this.currentTeamSubject);
  const url = `${environment.base_url_course}/${courseAcronym}/teams/${teamId}/students`
  return this.httpClient
  .get<Student[]>(url).pipe(
      tap(() =>
          console.log(`getMembersOfTeam ok studentId ${teamId} course ${courseAcronym}`
          )
      ),
      catchError(
          this.handleError<Student[]>(`getMembersOfTeam error studentId ${teamId} course ${courseAcronym}`,[])
      )
  );
}

  

  /**
   * This method create a team given a course and a proposal of team
   * @param courseAcronym the acronym of a course
   * @param proposalOfTeam proposal of a team
   */
  createTeam(courseAcronym: string, proposalOfTeam: ProposalOfTeam): Observable<Team> {
    const url = `${environment.base_url_course}/${courseAcronym}/teams`
    return this.httpClient.post<Team>(url,proposalOfTeam,environment.http_options)
        .pipe(tap(() =>
                console.log(`createTeam ${proposalOfTeam.teamName}`)
            ),
            catchError(this.handleError<Team>(`createTeam ${proposalOfTeam.teamName}`) )
        );
  }

  /**
   * This will accept the proposal of a team
   * @param tokenTeam the token associated to the team proposal
   */
  acceptTeamProposal(tokenTeam: string):  Observable<boolean> {
    const url = `${environment.base_url_teams}/acceptTeamInvitation/${tokenTeam}`
    return this.httpClient.get<boolean>(url,environment.http_options)
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
    const url = `${environment.base_url_teams}/rejectTeamInvitation/${tokenTeam}`
    return this.httpClient.get<boolean>(url,environment.http_options)
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