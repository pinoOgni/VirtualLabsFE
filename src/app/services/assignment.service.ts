import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HomeworkVersion } from '../models/homework-version.model';
import { Homework, HomeworkStatus } from '../models/homework.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private courseService: CourseService, private httpClient: HttpClient) { }


  /**
   * This method is used to retrieve the content of an assignment
   * Is used when the student/teacher click on a icon
   * @param assignmentId 
   * @param courseId 
   */
  getContentAssignment(assignmentId: number,courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Blob> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/content`
    return this.httpClient.get(url, {
      responseType: 'blob', //Blob object containing the binary data. document:
    }).pipe(
      tap(() => console.log(`getContentAssignment ok ${assignmentId}`)),
      catchError(this.handleError<any>(`getContentAssignment error ${assignmentId}`))
    );
  }


  /**
   * This method is used to retrieve all the homeworks 
   * @param assignmentId 
   * @param courseId 
   */
  getHomeworksOfAssignment(assignmentId: number,courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Homework[]> {
     const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homeworks`
     console.log(url)
    return this.httpClient.get<Homework[]>(url)
        .pipe(
          tap((homeworks) => console.log(`getHomeworksOfAssignments ok ${assignmentId}, homeworks, ${homeworks}`)),
          catchError(this.handleError<Homework[]>(`getHomeworksOfAssignments error ${assignmentId}`,[])));
  }

  /**
   * This method is used to retrieve all versions of a particular
   * assignment of a student
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  public getHomeworkVersionsOfStudent(assignmentId: number, studentId: string, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<HomeworkVersion[]> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}/versions`
    return this.httpClient.get<HomeworkVersion[]>(url)
        .pipe(
            tap(() => console.log(`getHomeworkVersionsOfStudent ok ${assignmentId} and ${studentId} `)),
            catchError(this.handleError<HomeworkVersion[]>(`getHomeworkVersionsOfStudent error ${assignmentId} and ${studentId}`,[])));
  }

  /**
   * This method is used to add a score to a given homework
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  addScoreToHomework(score: number, assignmentId: number, studentId: string, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Homework> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}/setScore`
    return this.httpClient.post<Homework>(url, {score}, environment.http_options
    ).pipe(
        tap(() => console.log(`addScoreToHomework ok ${assignmentId} and ${studentId} `)),
        catchError(this.handleError<Homework>(`addScoreToHomework error ok ${assignmentId} and ${studentId}`))
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
   * This method is used to get the content of a particular version 
   * of a homework of an assignment of a course of a student (it's a tongue twister?)
   * @param assignmetId 
   * @param studentId 
   * @param versionId 
   * @param courseId 
   */
  getContentHomeworkVersion(assignmetId: number, studentId: string, versionId: number, courseId = this.courseService.currentCourseIdSubject.value): Observable<any> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmetId}/homework/${studentId}/version/${versionId}`
    return this.httpClient.get(url, {
      responseType: 'blob',
    }).pipe(
        tap(() => console.log(`rgetContentHomeworkVersion ${versionId}`)),
        catchError(this.handleError<any>(`getContentHomeworkVersion error ${versionId}`))
    );
  }

}
