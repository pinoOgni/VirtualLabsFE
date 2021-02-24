import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Course} from '../models/course.model';
import {AuthService} from '../auth/auth.service';
import {Teacher} from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  /**
   * This method return a teacher given a teacherId
   * @param studentId 
   */
  getTeacher(teacherId: string): Observable<Teacher> {
    const url = `${environment.base_url_teachers}/${teacherId}`
    return this.httpClient.get<Teacher>(url).pipe(tap(() =>
      console.log(`getTeacher ${teacherId}`)
    ),
      catchError(this.handleError<any>(`getTeacher error ${teacherId}`))
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
        catchError(
          this.handleError<Course[]>(`getCoursesOfTeacherById error teacherId ${teacherId}`)
        )
      );
  }

  /**
   * This method is used to update a course
   * @param course 
   */
  // ALE
  update(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(environment.base_url_course, course, environment.http_options).pipe(
        catchError(this.handleError<any>('updateCourse'))
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

  /**
   * Method used to cancel a course
   * @param courseId 
   */
  deleteCourse(courseId: number) {
    const url = `${environment.base_url_course}/${courseId}`;
    console.log('sto per deletare: ' + courseId + ' all url ' + url);
    return this.httpClient.delete<any>(url).pipe(
        catchError(this.handleError<any>('deleteCourse')));
  }

  /**
   * Method used to add a course
   * @param newCourse 
   */
  addCourse(newCourse: Course): Observable<Course> {
    console.log('mi è arrivato ' + newCourse);
    return this.httpClient.post<Course>(environment.base_url_course, newCourse, environment.http_options).pipe(
        catchError(this.handleError<any>('addCourse'))
    );
  }
}
