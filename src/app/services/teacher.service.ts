import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Course} from '../models/course.model';
import {AuthService} from '../auth/auth.service';
import {Teacher} from '../models/teacher.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from '../helpers/error.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private errorService: ErrorService, private httpClient: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) { }

  /**
   * This method return a teacher given a teacherId
   * @param studentId 
   */
  getTeacher(teacherId: string): Observable<Teacher> {
    const url = `${environment.base_url_teachers}/${teacherId}`
    return this.httpClient.get<Teacher>(url).pipe(tap(() =>
      console.log(`getTeacher ${teacherId}`)
    ),
    catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
    );

  }


  /**
   *
   * @param teacherId the teacher id that is equal to the username of a user logged
   */
  getCoursesOfTeacherById(teacherId: string = this.authService.currentUserValue.username): Observable<Course[]> {
    const url = `${environment.base_url_teachers}/${teacherId}/courses`;
    return this.httpClient.get<Course[]>(url)
      .pipe(
        tap(() =>
          console.log(`getCoursesOfTeacherById ok teacherId ${teacherId}`)),
          catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
      );
  }

  /**
   * This method is used to update a course
   * @param course 
   */
  updateCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(environment.base_url_course, course, environment.http_options).pipe(
      catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
    );
  }

  /**
   * Method used to cancel a course
   * @param courseId 
   */
  deleteCourse(courseId: number) {
    const url = `${environment.base_url_course}/${courseId}`;
    console.log('sto per deletare: ' + courseId + ' all url ' + url);
    return this.httpClient.delete<any>(url).pipe(
      catchError((err,caught) =>  this.errorService.handleError<any>(err,caught)));
  }

  /**
   * Method used to add a course
   * @param newCourse 
   */
  addCourse(newCourse: Course): Observable<Course> {
    console.log('mi è arrivato ' + newCourse);
    return this.httpClient.post<Course>(environment.base_url_course, newCourse, environment.http_options).pipe(
      catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
    );
  }
}
