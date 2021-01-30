import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Course} from "../models/course.model";
import {Student} from "../models/student.model";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  base_URL = environment.base_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  /**
   * TODO
   * searchingTeachersInCourseByLastName: metodo per cercare i teacher in un corso. Ritorna Observable<Teacher[]>
   * searchingTeachersByLastName: metodo per cercare gli teacher. Ritorna un Observable<Teacher[]>
   * uploadTeacherAssignment: metodo per caricare l'assignment di uno teacher. Ritorna un Observable<Upload>
   */


  /**
   * 
   * @param teacherId the teacher id that is equal to the username of a user logged
   */
  getCoursesOfTeacherById(teacherId: string = this.authService.currentUserValue.username): Observable<Course[]> {
    const url = `${environment.base_url_teachers}/${teacherId}/courses`
    return this.httpClient.get<Course[]>(url)
      .pipe(
        tap(() =>
          console.log(`getCoursesOfTeacherById ok teacherId ${teacherId}`)),
        catchError(
          this.handleError<Course[]>(`getCoursesOfTeacherById error teacherId ${teacherId}`)
        )
      );
  }

  //ALE
  // TODO spostare in courseService
  update(course: Course): Observable<Course> {
    console.log('sto updatando: ' +  course.id + ' nome: ' + course.fullName);
    return this.httpClient.put<Course>(this.base_URL + 'courses/' + course.id, course, this.httpOptions).pipe(
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



}
 