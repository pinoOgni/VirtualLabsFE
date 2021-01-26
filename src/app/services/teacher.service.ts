import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Course} from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  base_URL = environment.base_URL;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) { }

  query(): Observable<Course[]> {
    return this.http.get<Course[]>(this.base_URL + 'courses')
        .pipe(
            catchError(this.handleError<Course[]>('query', []))
        );
  }
  // TODO spostare in courseService
  update(course: Course): Observable<Course> {
    console.log('sto updatando: ' +  course.id + ' nome: ' + course.fullName);
    return this.http.put<Course>(this.base_URL + 'courses/' + course.id, course, this.httpOptions).pipe(
        catchError(this.handleError<any>('updateCourse'))
    );

  }

  getHeldById(heldBy: number): Observable<Course[]> {
    const url = `${this.base_URL}courses/${heldBy}/`;
    return this.http.get<Course[]>(url)
        .pipe(
            catchError(this.handleError<Course[]>('getHeldById', []))
        );
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.base_URL + 'courses/', newCourse, this.httpOptions).pipe(
        catchError(this.handleError<any>('createCourse'))
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
