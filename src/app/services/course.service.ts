import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';
import { catchError, first, mergeMap, tap } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { CourseModel } from '../models/form-models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  base_URL = environment.base_URL

  public course: BehaviorSubject<Course>;
  public currentCourseAcrSubject: BehaviorSubject<string>;
 
  //test
  enrolledAvailableStudents: Student[] = [
    {id: "s200001@studenti.polito.it", email: "string", firstName: "cazzo", lastName: "culo"},
    {id: "3", email: "string", firstName: "hamza", lastName: "r"},
    {id: "4", email: "string", firstName: "leo", lastName: "t"},
    {id: "5", email: "string", firstName: "jack", lastName: "r"},
    {id: "6", email: "string", firstName: "john", lastName: "t"} 
  ];

  constructor(private httpClient: HttpClient) {
    //this.course = new BehaviorSubject<Course>(null);
    //test 
    this.course = new BehaviorSubject<Course>(new Course("APA","Algoritmi e Programmazione Avanzata",3,4,true));
    this.currentCourseAcrSubject = new BehaviorSubject<string>(null);
  }
  /**
   * 
   * @param courseAcronym is the acronym of the course (APA)
   */
  getThisCourse(courseAcronym: string): Observable<Course> {
    const url = `${this.base_URL}/courses/${courseAcronym}`;
    return this.httpClient
      .get<Course>(url).pipe( tap(() =>
          console.log(`getThisCourse ${courseAcronym}`)
        ),
        catchError(this.handleError<any>(`getThisCourse(${courseAcronym})`,[]))
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


  setNextCourse(courseAcronym: string) {
    this.currentCourseAcrSubject.next(courseAcronym);
    if (!courseAcronym) {
      this.course.next(null);
      return;
    }
    this.getThisCourse(courseAcronym)
      .pipe(first())
      .subscribe((x) => this.course.next(x));
  }

  /**
   * 
   * @param courseAcronym given a courseAcronym this will give the list of student of that course
   * that are available (not in a team)
   */
  getEnrolledAvailableStudents(courseAcronym: string = this.currentCourseAcrSubject.value): Observable<Student[]> {
    //test
    //return of<Student[]>(this.enrolledAvailableStudents);
    const url = `${this.base_URL}/courses/${courseAcronym}/availableStudents`;
    return this.httpClient
      .get<Student[]>(url).pipe( tap(() =>
          console.log(`getEnrolledAvailableStudents ${courseAcronym}`)
        ),
        catchError(this.handleError<any>(`getEnrolledAvailableStudents(${courseAcronym})`,[]))
      );
  }

  getAllCourses(): Observable<Course[]> {
    const url = `${this.base_URL}/courses`;
    return this.httpClient
      .get<Course[]>(url).pipe( tap(() =>
          console.log(`getAllCourses`)
        ),
        catchError(this.handleError<any>(`getAllCourses`,[]))
      );
  }



  getEnrolledStudents(courseAcronym: string = this.currentCourseAcrSubject.value): Observable<Student[]> {
    const url = `${this.base_URL}/courses/${courseAcronym}/enrolled`;
    return this.httpClient
      .get<Student[]>(url).pipe( tap(() =>
          console.log(`getEnrolledStudents ${courseAcronym}`)
        ),
        catchError(this.handleError<any>(`getEnrolledStudents(${courseAcronym})`,[]))
      );
  }




  deleteCourse(courseAcronym: string = this.currentCourseAcrSubject.value) {
    const url = `${this.base_URL}/courses/${courseAcronym}`
    return this.httpClient.delete<Course>(url)
    .pipe(
      catchError(this.handleError<Course>('deleteCourse')
    ));
  }


  createCourse(courseModel: CourseModel) {
    const url = `${this.base_URL}/courses`
    return this.httpClient.post<Course>(url,courseModel)
    .pipe(
      tap(() =>
       console.log("createCourse success")
      ),
      catchError(
        catchError(this.handleError<Course>('createCourse')
        )
      )
    );
  }

  


  /**
   * setNextCourse: setta il currentCourseNameSubject. Prende un courseAcronym o un acronimo
   * metodo getAllCourses per ottenere la lista di tutti i corsi. Ritorna Observable<Course[]> 
   * metodo getThisCourse per ottenere tutte le info di questo corso dall'ID (o dall'acronimo??). Prende un courseAcronym. Ritorna Observable<Student[]>
   * metodo getEnrolledStudents per ottenere gli studenti iscritti a questo corso
   * metodo getEnrolledAvailableStudents per ottenere gli studenti iscritti a questo corso che sono liberi
   * metodo enrollStudentsToCourse per aggiungere degli studenti al corso dato un ID. Prende un courseAcronym e un Student[]. Ritorna Observable<Student[]>
   * metodo enrollStudentsToCourseWithCSV per aggiungere degli studenti al corso dato un ID con csv. Prende un FORM e un courseAcronym.
   * metodo unenrollStudentFromCourse per eliminare uno studente da un corso dato l'ID. Prende un courseAcronym e uno Student[].
   * metodo unenrollStudentsFromCourse per eliminare degli studenti dal corso. Prende un courseAcronym e uno Student.
   * metodo getAvailableStudentsOfCourse per ottenere la lista di studenti dato l'ID del corso. Prende un courseAcronym. Ritorna un Observable<Student[]>
   * metodo getTeachersOfCourse per ottenere la lista di teacher che tengono un Course. Prende un Course. Ritorna un Observable<Teacher[]>
   * metodo deleteCourse per cancellare un corso in base all'ID o all'acronimo?
   * metodo createCourse per creare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * metodo updateCourse per aggiornare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * metodo addTeacherToCourse per aggiungere un teacher al corso. Prende un Course e un Teacher. Ritorna un Observable<Teacher>
   * metodo removeTeacherFromCourse per rimuovere un teacher dal corso. Prende un Teacher e un Course. Ritorna Observable<Teacher>
   * getVmsOfCourse per ottenere tutte le VM di questo corso. Prende un courseAcronym. Ritorna un Observable<TeacherVmInfo>
   * getAssignmentsOfCourse per ottenere tutti gli assignements di questo corso. Prende un courseAcronym. Ritorna Observable<Assignment[]>
   * createAssignment: crea un assignment per questo corso. Ritorna un Observable<Assignment>. FORM ASSIGNMENT
   */

}
