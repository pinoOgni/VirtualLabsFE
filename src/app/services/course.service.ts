import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Course} from '../models/course.model';
import {catchError, first, tap} from 'rxjs/operators';
import {Student} from '../models/student.model';
import {CourseModel, CreateAssignment} from '../models/form-models';
import {Teacher} from '../models/teacher.model';
import {Assignment} from '../models/assignment.model';
import {Team} from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public course: BehaviorSubject<Course>;
  public currentCourseIdSubject: BehaviorSubject<string>;

  //test
  enrolledAvailableStudents: Student[] = [
    {id: "s200001@studenti.polito.it", email: "string", firstName: "cazzo", lastName: "culo"},
    {id: "3", email: "string", firstName: "hamza", lastName: "r"},
    {id: "4", email: "string", firstName: "leo", lastName: "t"},
    {id: "5", email: "string", firstName: "jack", lastName: "r"},
    {id: "6", email: "string", firstName: "john", lastName: "t"} 
  ];
  //test 
  exampleAssignments: Assignment[] = [
    {id: 1, releaseDate:"bbb", expiryDate:"cccc", name: "aaaa",content: "aaaaaaaa"},
    {id: 2, releaseDate:"eee", expiryDate:"ffff", name: "dddd", content: "bbbbbbbb"}
  ];


  constructor(private httpClient: HttpClient) {
    this.course = new BehaviorSubject<Course>(null);
    // test 
    // this.course = new BehaviorSubject<Course>(new Course("APA","Algoritmi e Programmazione Avanzata",3,4,true));
    this.currentCourseIdSubject = new BehaviorSubject<string>(null);
  }

  /**
   * metodo enrollStudentsToCourseWithCSV per aggiungere degli studenti al corso dato un ID con csv. Prende un FORM e un courseId.
   * metodo updateCourse per aggiornare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * getVmsOfCourse per ottenere tutte le VM di questo corso. Prende un courseId. Ritorna un Observable<TeacherVmInfo>
   */



  /**
   * This method is used to enable a course
   * @param courseId 
   */
  enableCourse(courseId: string = this.currentCourseIdSubject.value): Observable<boolean> {
    const url = `${environment.base_url_course}/${courseId}/enableCourse`
    return this.httpClient.put<boolean>(url,{},environment.http_options)
      .pipe(
        tap(() => {
          console.log(`enableCourse ok ${courseId}`);
        }),
        catchError(
          this.handleError<boolean>(`enableCourse error ${courseId} `)
        )
    )
  }

  /**
   * This method is used to disable a course
   * @param courseId 
   */
  disableCourse(courseId: string = this.currentCourseIdSubject.value): Observable<boolean> {
    const url = `${environment.base_url_course}/${courseId}/disableCourse`
    return this.httpClient.put<boolean>(url,{},environment.http_options)
      .pipe(
        tap(() => {
          console.log(`disableCourse ok ${courseId}`);
        }),
        catchError(
          this.handleError<boolean>(`disableCourse error ${courseId} `)
        )
    )
  }


  /**
   * This method is used to retrieve all teachers of a given course
   * @param course 
   */
  getTeachersOfCourse(course: Course): Observable<Teacher[]> {
    const url = `${environment.base_url_course}/${course.id}/teachers`
    return this.httpClient.get<Teacher[]>(url)
      .pipe(
        tap(() =>
          console.log(`getTeachersOfCourse ok ${course.id}`
          )
        ),
        catchError(
          this.handleError<Teacher[]>(`getTeachersOfCourse error ${course.id}`
          )
        )
      );
  }


  /**
   * 
   * @param courseId is the id of the course (APA)
   */
  getThisCourse(courseId: string): Observable<Course> {
    const url = `${environment.base_url_course}/${courseId}`;
    return this.httpClient
      .get<Course>(url).pipe( tap(() =>
          console.log(`getThisCourse ok ${courseId}`)
        ),
        catchError(this.handleError<any>(`getThisCourse error ${courseId} `,[]))
      );
  }

  /**
   * This method is used to create an assignment for a given course
   * @param formCreateAssignment 
   */
  createAssignment(formCreateAssignment: CreateAssignment): Observable<Assignment> {
    const url = `${environment.base_url_course}/${this.currentCourseIdSubject.value}/assignment`
    return this.httpClient.post<Assignment>(url,formCreateAssignment)
      .pipe(
        tap(() => console.log('createAssignment ok') ),
          catchError(this.handleError<Assignment>(`createAssignment error`)
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


  setNextCourse(courseId: string) {
    this.currentCourseIdSubject.next(courseId);
    if (!courseId) {
      this.course.next(null);
      return;
    }
    this.getThisCourse(courseId)
      .pipe(first())
      .subscribe((x) => this.course.next(x));
  }

  /**
  * This method will make a get to the server to retrieve the
   * list of students that are enrolled in this course and also available
   * i.e. with no team
   * @param courseId given a courseId this will give the list of student of that course
   * that are available (not in a team)
   */
  getEnrolledAvailableStudentsForCourse(courseId: string = this.currentCourseIdSubject.value): Observable<Student[]> {
    //test
    //return of<Student[]>(this.enrolledAvailableStudents);
    const url = `${environment.base_url_course}/${courseId}/availableStudents`;
    return this.httpClient
      .get<Student[]>(url).pipe( tap(() =>
          console.log(`getEnrolledAvailableStudents ok ${courseId}`)
        ),
        catchError(this.handleError<any>(`getEnrolledAvailableStudents error ${courseId}`,[]))
      );
  }

  /**
   * This method return all courses
   */
  getAllCourses(): Observable<Course[]> {
    const url = `${environment.base_url_course}`;
    return this.httpClient
      .get<Course[]>(url).pipe( tap(() =>
          console.log(`getAllCourses`)
        ),
        catchError(this.handleError<any>(`getAllCourses`,[]))
      );
  }


  /**
   * This method returns all students of a course
   * @param courseId 
   */
  getEnrolledStudents(courseId: string = this.currentCourseIdSubject.value): Observable<Student[]> {
    const url = `${environment.base_url_course}/${courseId}/enrolled`;
    return this.httpClient
      .get<Student[]>(url).pipe( tap(() =>
          console.log(`getEnrolledStudents ${courseId}`)
        ),
        catchError(this.handleError<any>(`getEnrolledStudents(${courseId})`,[]))
      );
  }



  /**
   * This method is used to delete a course
   * @param courseId 
   */
  deleteCourse(courseId: string = this.currentCourseIdSubject.value) {
    const url = `${environment.base_url_course}/${courseId}`
    return this.httpClient.delete<Course>(url)
    .pipe(
      catchError(this.handleError<Course>('deleteCourse')
    ));
  }

  /**
   * This method is used to create a course
   * @param courseModel 
   */
  createCourse(courseModel: CourseModel) {
    const url = `${environment.base_url_course}`
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
   * @param courseId the id of the course
   */
  enrollStudentToCourse(student: Student,courseId: string): Observable<Student> {
    const url =  `${environment.base_url_course}/${courseId}/enrollOne`
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
   * @param courseId 
   */
  enrollStudentsToCourse(students: Student[], courseId: string = this.currentCourseIdSubject.value): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(student => temp$.push(this.enrollStudentToCourse(student, courseId)));
  return forkJoin(temp$);
  }


  /**
   * This method is used to unenroll a student from a course
   * @param student 
   * @param courseId 
   */
  unenrollStudentFromCourse(student: Student, courseId: string) {
    const url =  `${environment.base_url_course}/${courseId}/unenrollStudent`
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
   * @param courseId 
   */
  unenrollStudentsFromCourse(students: Student[], courseId: string = this.currentCourseIdSubject.value): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(student => temp$.push(this.unenrollStudentFromCourse(student, courseId)));
  return forkJoin(temp$);
  }

  /**
   * This method is used to add a teacher to a given course
   * @param teacher 
   * @param course 
   */
  addTeacherToCourse(teacher: Teacher,course: Course): Observable<Teacher> {
    const url = `${environment.base_url_course}/${course.id}/addTeacher`
    return this.httpClient.put<Teacher>(url,{ teacherId: teacher.id },environment.http_options)
      .pipe(
        tap((teacher) => {
          if (teacher) {
            console.log(`addTeacherToCourse ok ${teacher.id}`)
          } else {
            console.log(`addTeacherToCourse teacher ${teacher.id} already in this course ${course.id}`);
          }
        }),
        catchError(
          this.handleError<Teacher>(`addTeacherToCourse error teacher ${teacher.id} and course ${course.id})` )
        )
      );
  }


  /**
   * This method is used to remove a teacher from a given course
   * @param teacher 
   * @param course 
   */
  removeTeacherFromCourse(teacher: Teacher, course: Course): Observable<Teacher> {
    const url = `${environment.base_url_course}/${course.id}/removeTeacher`
    return this.httpClient.put<Teacher>(url, { teacherId: teacher.id },environment.http_options )
      .pipe(
        tap((teacher) => {
         console.log(`removeTeacherFromCourse ok, ${teacher.id}`)
        }),
        catchError(
          this.handleError<Teacher>(`removeTeacherFromCourse error teacher ${teacher.id} and course ${course.id})` )
        )
      );
  }

  /**
   * This method is used to retrieve all assignments of a course
   * @param courseId
   */
  getAssignmentsOfCourse(courseId: string = this.currentCourseIdSubject.value): Observable<Assignment[]> {
    //    return of(this.exampleAssignments);
    const url = `${environment.base_url_course}/${courseId}/assignments`;
    return this.httpClient.get<Assignment[]>(url)
        .pipe(tap(() =>
                console.log(`getAssignmentsOfCourse ok ${courseId}`)
            ),
            catchError(this.handleError<any>(`getAssignmentsOfCourse(${courseId})`, []))
        );
  }

  public getTeamsOfCourse(courseId: string = this.currentCourseIdSubject.value): Observable<Team[]> {
    const url = `${environment.base_url_course}/${courseId}/teams`;
    console.log('url vale' + url);
    return this.httpClient.get<Team[]>(url)
        .pipe(tap(() =>
                console.log(`getTeamsOfCourse ok ${courseId}`)
            ),
            catchError(this.handleError<any>(`getTeamsOfCourse(${courseId})`, []))
        );
  }


}
