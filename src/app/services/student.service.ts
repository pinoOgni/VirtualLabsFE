import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Proposal } from '../models/proposal.model';
import { AuthService } from '../auth/auth.service';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  base_URL = environment.base_URL;

  constructor(private httpClient: HttpClient, private authService: AuthService, private courseService: CourseService) {
  }

  /**
   * Name of the current team
   */
  teamName: string;

  /**
   * Name of the current creator
   */
  creator: string;

  /**
   * List of team members with name, surname, id and status
   */
  membersWithState: string[];

  /**
   * expiration of a team (actually a team proposal)
   */
  deadline: string;

  isValid: boolean;

  /**
   * token of a student?
   */
  token: string;


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /**
   * This method returns a student given a studentId
   * @param studentId 
   */
  getStudent(studentId: string): Observable<Student> {
    const url = `${environment.base_url_students}/${studentId}`
    return this.httpClient.get<Student>(url).pipe(tap(() =>
      console.log(`getStudent ${studentId}`)
    ),
      catchError(this.handleError<any>(`getStudent error ${studentId}`))
    );

  }

  /**
   * This method is used to make a request to the the server and retrieve all the available
   * students of the course with courseId and ad criteria is used the name
   * If the courseId is undefined it returns an empty Observable<[]>
   * @param courseId acronym of the course
   * @param name the first name or the last name of the student
   */
  searchingAvailableStudentsInCourseByName(name: string, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Student[]> {
    //return of<Student[]>(this.searchingStudents)
    const url = `${environment.base_url_course}/${courseId}/availableStudents`
    //copiare funzione dal lab5 PROF
    if (typeof name !== 'string' || courseId === undefined) {
      return of([]);
    } else {
      //whitespaces
      name = name.trim();
      if (!name || name.indexOf(' ') >= 0) {
        return of([]);
      }
    }
    return this.httpClient.get<Student[]>(url)
      .pipe(
        tap((s) =>
          console.log(`searchingAvailableStudentsInCourseByName  ${s.length} for criteria ${name}`
          )
        ),
        catchError(this.handleError<Student[]>(`searchingAvailableStudentsInCourseByName error ${name})`, [])
        )
      );
  }

  /**
   * It searchs all the students in the DB with a given last name
   * @param name the last name of the student
   */
  searchingStudentsByName(name: string): Observable<Student[]> {
    // return of<Student[]>(this.searchingStudents)
    const url = `${environment.base_url_students}`
    if (typeof name !== 'string') {
      return of([]);
    }
    else {
      //if th name has whitespaces
      name = name.trim();
      if (!name || name.indexOf(' ') >= 0) {
        return of([]);
      }
    }
    return this.httpClient.get<Student[]>(url)
      .pipe(tap((s) =>
        console.log(`searchingStudentsByName ${s.length} for critera: ${name} `)
      ),
        catchError(
          this.handleError<Student[]>(`searchingStudentsByName error ${name}`, [])
        )
      );
  }

  /**
   * The parametrers are taken by the courseService and authService, exploiting the injection and the 
   * power of BehaviorSubject
   * This method is used to retrieve all proposal notifications for this course and for the logged student
   * @param courseId the acronym of the course
   * @param studentId the id of the student
   */
  getProposalsReceivedInCourse(courseId: number = this.courseService.currentCourseIdSubject.value, studentId: string = this.authService.currentUserValue.username): Observable<Proposal[]> {
    // return of<Proposal[]>(this.exampleProposals)
    const url = `${environment.base_url_students}/${studentId}/courses/${courseId}/notifications/invited`
    return this.httpClient.get<Proposal[]>(url, environment.http_options)
      .pipe(
        tap(() =>
          console.log(`getProposalsReceivedInCourse ok studentId ${studentId}, course ${courseId}`)
        ),
        catchError(
          this.handleError<Proposal[]>(`getProposalsReceivedInCourse error studentId ${studentId}, course ${courseId})`, []))
      );
  }


  /**
   * The parametrers are taken by the courseService and authService, exploiting the injection and the 
   * power of BehaviorSubject
   * This method is used to retrieve all proposal notifications for this course and for the logged student
   * @param courseId the acronym of the course
   * @param studentId the id of the student
   */
  getProposalsSentInCourse(courseId: number = this.courseService.currentCourseIdSubject.value, studentId: string = this.authService.currentUserValue.username): Observable<Proposal[]> {
    // return of<Proposal[]>(this.exampleProposals)
    const url = `${environment.base_url_students}/${studentId}/courses/${courseId}/notifications/created`
    return this.httpClient.get<Proposal[]>(url, environment.http_options)
      .pipe(
        tap(() =>
          console.log(`getProposalsSentInCourse ok studentId ${studentId}, course ${courseId}`)
        ),
        catchError(
          this.handleError<Proposal[]>(`getProposalsSentInCourse error studentId ${studentId}, course ${courseId})`, []))
      );
  }

  /**
   * Retrieve all the courses taken by the student
   * @param studentId the id of the student
   */
  getCoursesOfStudentById(studentId: string = this.authService.currentUserValue.username): Observable<Course[]> {
    const url = `${environment.base_url_students}/${studentId}/courses`
    return this.httpClient.get<Course[]>(url)
      .pipe(
        tap(() =>
          console.log(`getCoursesOfStudentById ok studentId ${studentId}`)),
        catchError(
          this.handleError<Course[]>(`getCoursesOfStudentById error studentId ${studentId}`)
        )
      );
  }



}
