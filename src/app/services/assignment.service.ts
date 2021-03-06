import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../helpers/error.service';
import { HomeworkVersion } from '../models/homework-version.model';
import { Homework, HomeworkStatus } from '../models/homework.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private errorService: ErrorService, private authService: AuthService, private courseService: CourseService, private httpClient: HttpClient) { }


  /**
   * This method is used to retrieve the content of an assignment
   * Is used when the student/teacher click on a icon
   * @param assignmentId 
   * @param courseId 
   */
  getContentAssignment(assignmentId: number, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Blob> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/content`
    return this.httpClient.get(url, {
      responseType: 'blob', //Blob object containing the binary data. document:
    }).pipe(
      tap(() => console.log(`getContentAssignment ok ${assignmentId}`)),
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }

  /**
   * This method is used to retrieve all the homeworks 
   * @param assignmentId 
   * @param courseId 
   */
  getHomeworksOfAssignment(assignmentId: number, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Homework[]> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homeworks`
    return this.httpClient.get<Homework[]>(url)
      .pipe(
        tap((homeworks) => console.log(`getHomeworksOfAssignments ok ${assignmentId}, homeworks, ${homeworks}`)),
        catchError((err, caught) => this.errorService.handleError<any>(err, caught))
      );
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
        catchError((err, caught) => this.errorService.handleError<any>(err, caught))
      );
  }

  /**
   * This method is used to add a score to a given homework
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  addScoreToHomework(score: FormData, assignmentId: number, studentId: string, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<Homework> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}/setScore`
    return this.httpClient.post<Homework>(url, score
    ).pipe(
      tap(() => console.log(`addScoreToHomework ok ${assignmentId} and ${studentId} `)),
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }


  /**
   * This method is used to fetch the content of a particular homerowk version 
   * of a given course assignment for the logged in student (it's a tongue twister?)
   * @param assignmetId 
   * @param studentId 
   * @param versionId 
   * @param courseId 
   */
  getContentHomeworkVersion(assignmetId: number, studentId: string, versionId: number, courseId = this.courseService.currentCourseIdSubject.value): Observable<Blob> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmetId}/homework/${studentId}/version/${versionId}/content`
    return this.httpClient.get(url, {
      responseType: 'blob',
    }).pipe(
      tap(() => console.log(`getContentHomeworkVersion ${versionId}`)),
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }


  /**
   * This method is used to upload a new version for a given assignment
   * @param homeworkVersion 
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  newHomeworkVersion(homeworkVersion: FormData, assignmentId: number, studentId: string = this.authService.currentUserValue.username, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<HomeworkVersion> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}/submit`
    return this.httpClient.post<HomeworkVersion>(url, homeworkVersion
    ).pipe(
      tap(() => console.log(`newHomeworkVersion ok ${assignmentId} and ${studentId} `)),
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }

  /**
   * This method is used to upload a new review for a homework
   * @param homeworkVersion 
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  newReviewToHomework(reviewHomework: FormData, canReSubmitValue: boolean, assignmentId: number, studentId: string, courseId: number = this.courseService.currentCourseIdSubject.value): Observable<HomeworkVersion> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}/review?canReSubmit=${canReSubmitValue}`
    return this.httpClient.post<HomeworkVersion>(url, reviewHomework
    ).pipe(
      tap(() => console.log(`newReviewToHomework ok ${assignmentId} and ${studentId} `)),
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }

}
