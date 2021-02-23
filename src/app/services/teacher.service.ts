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
  base_URL = environment.base_URL;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  /**
   * TODO
   * searchingTeachersInCourseByName: metodo per cercare i teacher in un corso. Ritorna Observable<Teacher[]>
   * searchingTeachersByName: metodo per cercare gli teacher. Ritorna un Observable<Teacher[]>
   * uploadTeacherAssignment: metodo per caricare l'assignment di uno teacher. Ritorna un Observable<Upload>
   */


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

  // ALE
  // TODO spostare in courseService
  update(course: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log('sto updaando: ' + course.id + ' nome: ' + course.name);
    return this.httpClient.put<Course>(this.base_URL + 'courses/', course, httpOptions).pipe(
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


  deleteCourse(courseId: number): Observable<Course> {
    const url = `${environment.base_url_course}/${courseId}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log('sto per deletare: ' + courseId + ' all url ' + url);
    return this.httpClient.delete<any>(url).pipe(
        catchError(this.handleError<any>('deleteCourse')));
  }

  
  addCourse(newCourse: Course): Observable<Course> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log('mi è arrivato ' + newCourse);
    return this.httpClient.post<Course>(this.base_URL + 'courses/', newCourse, httpOptions).pipe(
        catchError(this.handleError<any>('addCourse'))
    );
  }
}
