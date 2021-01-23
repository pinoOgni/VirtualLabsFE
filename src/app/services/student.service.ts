import { Injectable } from '@angular/core';
import {Student} from "../models/student.model";
import {Course} from "../models/course.model";
import {forkJoin, Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  base_URL = environment.base_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  query(): Observable<Student[]> {
   return this.http.get<Student[]>(this.base_URL + 'students')
      .pipe(
        catchError(this.handleError<Student[]>('query', []))
      );
  }

  getEnrolled(courseId: number): Observable<Student[]> {
    const url = `${this.base_URL}courses/${courseId}/students?_expand=group`;
    return this.http.get<Student[]>(url)
      .pipe(
        catchError(this.handleError<Student[]>('getEnrolled', []))
      );
  }


  // per aggiornarne uno esistente
  update(student: Student): Observable<Student> {
    //in the db json we cannot put the teamName because it is a relation
    // TODO
    // delete student.teamName; 
    return this.http.put<Student>(this.base_URL+'students/' + student.id, student, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  // per recuperarne uno dato l’id univoco
  find(id: number): Observable<Student> {
    const url = `${this.base_URL}/students/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        catchError(this.handleError<Student>('find')
        )
      );
  }

  // per eliminare un elemento dato l’id univoco
  delete(id: number): Observable<Student> {
    const url = `${this.base_URL}/students/${id}`;
    return this.http.delete<Student>(url)
      .pipe(
        catchError(this.handleError<Student>('delete')
        )
      );
  }

  // Iscrivere e dis-iscrivere uno o più studenti ad un corso (e.g. updateEnrolled)
  updateEnrolled(students: Student[]): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(s => temp$.push(this.update(s)));
  return forkJoin(temp$);
  }

  // per creare un nuovo elemento
  create(student: Student): Observable<Student> {
    //in the db json we cannot put the teamName because it is a relation
    // TODO
    // delete student.groupName;
    return this.http.post<Student>(this.base_URL+'students/', student, this.httpOptions).pipe(
      catchError(this.handleError<any>('createStudent'))
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

  public getCoursesOfStudentById(id: string): Observable<Course[]> {
    // TODO implementare
    return null;
  }
}
