import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';
import { catchError, first, mergeMap, tap } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { CourseModel } from '../models/form-models';
import { Teacher } from '../models/teacher.model';

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
    this.course = new BehaviorSubject<Course>(null);
    // test 
    // this.course = new BehaviorSubject<Course>(new Course("APA","Algoritmi e Programmazione Avanzata",3,4,true));
    this.currentCourseAcrSubject = new BehaviorSubject<string>(null);
  }

  /**
   * metodo enrollStudentsToCourseWithCSV per aggiungere degli studenti al corso dato un ID con csv. Prende un FORM e un courseAcronym.
   * metodo getTeachersOfCourse per ottenere la lista di teacher che tengono un Course. Prende un Course. Ritorna un Observable<Teacher[]>
   * metodo deleteCourse per cancellare un corso in base all'ID o all'acronimo?
   * metodo createCourse per creare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * metodo updateCourse per aggiornare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * getVmsOfCourse per ottenere tutte le VM di questo corso. Prende un courseAcronym. Ritorna un Observable<TeacherVmInfo>
   * getAssignmentsOfCourse per ottenere tutti gli assignements di questo corso. Prende un courseAcronym. Ritorna Observable<Assignment[]>
   * createAssignment: crea un assignment per questo corso. Ritorna un Observable<Assignment>. FORM ASSIGNMENT
   */

  getTeachersOfCourse(course: Course): Observable<Teacher[]> {
    const url = `${environment.base_url_course}/${course.acronym}/teachers`
    return this.httpClient.get<Teacher[]>(url)
      .pipe(
        tap(() =>
          console.log(`getTeachersOfCourse ok ${course.acronym}`
          )
        ),
        catchError(
          this.handleError<Teacher[]>(`getTeachersOfCourse error ${course.acronym}`
          )
        )
      );
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

  /**
   * This method will make a get to the server to retrieve the
   * list of students that are enrolled in this course and also available
   * i.e. with no team
   * @param courseAcronym the course acronym
   */
  getAvailableStudentsOfCourse(courseAcronym: string = this.currentCourseAcrSubject.value): Observable<Student[]> {
    const url = `${environment.base_url_course}/${courseAcronym}/availableStudents`
    return this.httpClient.get<Student[]>(url)
      .pipe(
        tap(() =>
          console.log(`getAvailableStudentsOfCourse ok ${courseAcronym}`)
        ),
        catchError(
          this.handleError<Student[]>(`getAvailableStudentsOfCourse error ${courseAcronym}`)
        )
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
   * This method will enroll a student to a given course
   * @param student the student to enroll
   * @param courseAcronym the acronym of the course
   */
  enrollStudentToCourse(student: Student,courseAcronym: string): Observable<Student> {
    const url =  `${environment.base_url_course}/${courseAcronym}/enrollOne`
    return this.httpClient.put<Student>(url, {studentId: student.id},environment.http_options)
    .pipe(
      tap(() => {
        console.log(`enrollStudentToCourse ok ${student.id}`);
      }),
      catchError(
        this.handleError<Student>(`enrollStudentToCourse error ${student.id} `)
      )
    );
  }
  

  /**
   * This method calls the enrollStudentToCourse
   * @param students 
   * @param courseAcronym 
   */
  enrollStudentsToCourse(students: Student[], courseAcronym: string = this.currentCourseAcrSubject.value): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(student => temp$.push(this.enrollStudentToCourse(student, courseAcronym)));
  return forkJoin(temp$);
  }



  unenrollStudentFromCourse(student: Student, courseAcronym: string) {
    const url =  `${environment.base_url_course}/${courseAcronym}/unenrollStudent`
    return this.httpClient.put<Student>(url,{ studentId: student.id },environment.http_options)
      .pipe(
        tap((student) => {
          console.log(`unenrollStudentFromCourse ok ${student.id}`
          );
        }),
        catchError(
          this.handleError<Student>(`unenrollStudentFromCourse error ${student.id} ` )
        )
      );
  }

  /**
   * This method calls the unenrollStudentFromCourse
   * @param students 
   * @param courseAcronym 
   */
  unenrollStudentsFromCourse(students: Student[], courseAcronym: string = this.currentCourseAcrSubject.value): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(student => temp$.push(this.unenrollStudentFromCourse(student, courseAcronym)));
  return forkJoin(temp$);
  }


  addTeacherToCourse(teacher: Teacher,course: Course): Observable<Teacher> {
    const url = `${environment.base_url_course}/${course.acronym}/addTeacher`
    return this.httpClient.put<Teacher>(url,{ teacherId: teacher.id },environment.http_options)
      .pipe(
        tap((teacher) => {
          if (teacher) {
            console.log(`addTeacherToCourse ok ${teacher.id}`)
          } else {
            console.log(`addTeacherToCourse teacher ${teacher.id} already in this course ${course.acronym}`);
          }
        }),
        catchError(
          this.handleError<Teacher>(`addTeacherToCourse error teacher ${teacher.id} and course ${course.acronym})` )
        )
      );
  }


  removeTeacherFromCourse(teacher: Teacher, course: Course): Observable<Teacher> {
    const url = `${environment.base_url_course}/${course.acronym}/removeTeacher`
    return this.httpClient.put<Teacher>(url, { teacherId: teacher.id },environment.http_options )
      .pipe(
        tap((teacher) => {
         console.log(`removeTeacherFromCourse ok, ${teacher.id}`)
        }),
        catchError(
          this.handleError<Teacher>(`removeTeacherFromCourse error teacher ${teacher.id} and course ${course.acronym})` )
        )
      );
  }



}
