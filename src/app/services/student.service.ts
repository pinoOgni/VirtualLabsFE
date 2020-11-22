import { Injectable } from '@angular/core';
import {StudentModel} from "../student.model";
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

  query(): Observable<StudentModel[]> {
   return this.http.get<StudentModel[]>(this.base_URL + 'students')
      .pipe(
        catchError(this.handleError<StudentModel[]>('query', []))
      );
  }

  getEnrolled(courseId: number): Observable<StudentModel[]> {
    const url = `${this.base_URL}course/${courseId}/students?_expand=group`;
    return this.http.get<StudentModel[]>(url)
      .pipe(
        catchError(this.handleError<StudentModel[]>('getEnrolled', []))
      );
  }


  // per aggiornarne uno esistente
  update(student: StudentModel): Observable<StudentModel> {
    //in the db json we cannot put the groupName because it is a relation
    delete student.groupName;
    return this.http.put<StudentModel>(this.base_URL+'students/' + student.id, student, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  // per recuperarne uno dato l’id univoco
  find(id: number): Observable<StudentModel> {
    const url = `${this.base_URL}/students/${id}`;
    return this.http.get<StudentModel>(url)
      .pipe(
        catchError(this.handleError<StudentModel>('find')
        )
      );
  }

  // per eliminare un elemento dato l’id univoco
  delete(id: number): Observable<StudentModel> {
    const url = `${this.base_URL}/students/${id}`;
    return this.http.delete<StudentModel>(url)
      .pipe(
        catchError(this.handleError<StudentModel>('delete')
        )
      );
  }

  // Iscrivere e dis-iscrivere uno o più studenti ad un corso (e.g. updateEnrolled)
  updateEnrolled(students: StudentModel[]): Observable<StudentModel[]> {
    const temp$ = new Array<Observable<StudentModel>>();
    students.forEach(s => temp$.push(this.update(s)));
  return forkJoin(temp$);
  }

  // per creare un nuovo elemento
  create(student: StudentModel): Observable<StudentModel> {
    //in the db json we cannot put the groupName because it is a relation
    delete student.groupName;
    return this.http.post<StudentModel>(this.base_URL+'students/', student, this.httpOptions).pipe(
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

}
