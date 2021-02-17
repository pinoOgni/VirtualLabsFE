import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Course} from '../models/course.model';
import {catchError, first, flatMap, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {Student} from '../models/student.model';
import {CourseModel} from '../models/form-models';
import {Teacher} from '../models/teacher.model';
import {Assignment} from '../models/assignment.model';
import {Team} from '../models/team.model';
import {VmInstanceModel, VmInstanceStatus} from '../models/vm-instance-model';
import {TeamStatus} from '../models/team-status';
import {AssignmentHomeworkStudent} from '../models/assignment-homework-student.model';
import {Homework} from '../models/homework.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    /**
     exampleAssignmentHomeworkStudent: AssignmentHomeworkStudent[] = [
     {assignment_id: 13, name: 'assignment 100', releaseDate: '1717171717', expiryDate: '1782372831',
    currentStatus: HomeworkStatus.REVIEWED, score: 30 },
    {assignment_id: 15, name: 'assignment 111', releaseDate: '1313131313', expiryDate: '51515151515',
    currentStatus: HomeworkStatus.SCORED, score: 28 }
  ]
 */

  public course: BehaviorSubject<Course>;
  public currentCourseIdSubject: BehaviorSubject<number>;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.course = new BehaviorSubject<Course>(null);
    this.currentCourseIdSubject = new BehaviorSubject<number>(null);
  }

  /**
   * metodo enrollStudentsToCourseWithCSV per aggiungere degli studenti al corso dato un ID con csv. Prende un FORM e un courseId.
   * metodo updateCourse per aggiornare un corso. Ritorna un Observable<Course>. FORM COURSE.
   * getVmsOfCourse per ottenere tutte le VM di questo corso. Prende un courseId. Ritorna un Observable<TeacherVmInfo>
   */


  /**
   * This method is used to retrieve all assignments and homeworks of an assignment
   * of a student of the current course
   * assignment and homework are merged in a assignmentHomeworkStudent that will be displayed 
   * in the correct component
   * Inspired by that bomber of Ale who wrote getHomeworksInfoStudents method
   * @param courseId 
   * @param studentId 
   */
  getAssignmentHomeworks(courseId: number = this.currentCourseIdSubject.value, studentId: string = this.authService.currentUserValue.username): Observable<AssignmentHomeworkStudent[]> {

    // return of(this.exampleAssignmentHomeworkStudent);
    return this.getAssignmentsOfCourse(courseId).pipe(
      first(),
      flatMap(x => x),
      mergeMap(assignment => {
        let assignmentHomeworkStudent = new AssignmentHomeworkStudent()
        assignmentHomeworkStudent.assignment_id = assignment.id;
        assignmentHomeworkStudent.expiryDate = assignment.expiryDate;
        assignmentHomeworkStudent.releaseDate = assignment.releaseDate;
        assignmentHomeworkStudent.name = assignment.name;
        return this.getHomeworkOfAssignmentOfStudent(assignment.id,studentId,courseId).pipe(
          map(homework => ({
            homework,assignmentHomeworkStudent
          })),
          map(middleMerge => {
            middleMerge.assignmentHomeworkStudent.currentStatus = middleMerge.homework.currentStatus;
           // middleMerge.assignmentHomeworkStudent.currentStatusTs = middleMerge.homework.currentStatus.toString();
            middleMerge.assignmentHomeworkStudent.score = middleMerge.homework.score;
            return middleMerge.assignmentHomeworkStudent;
          })
        )
      }),toArray()
    )
  }


  /**
   * This method is used to retrieve a homework of a student for a 
   * particular assignment of a course
   * @param assignmentId 
   * @param studentId 
   * @param courseId 
   */
  getHomeworkOfAssignmentOfStudent(assignmentId: number, studentId: string, courseId: number = this.currentCourseIdSubject.value): Observable<Homework> {
    const url = `${environment.base_url_course}/${courseId}/assignment/${assignmentId}/homework/${studentId}`
    console.log(url)
   return this.httpClient.get<Homework>(url)
       .pipe(
         tap((homeworks) => console.log(`getHomeworksOfAssignments ok ${assignmentId}`)),
         catchError(this.handleError<Homework>(`getHomeworksOfAssignments error ${assignmentId}`)));
 }



  /**
   * This method is used to enable a course
   * @param courseId 
   */
  enableCourse(courseId: number = this.currentCourseIdSubject.value): Observable<boolean> {
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
  disableCourse(courseId: number = this.currentCourseIdSubject.value): Observable<boolean> {
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
  getThisCourse(courseId: number): Observable<Course> {
    const url = `${environment.base_url_course}/${courseId}`;
    return this.httpClient
      .get<Course>(url).pipe( tap(() =>
          console.log(`getThisCourse ok ${courseId}`)
        ),
        catchError(this.handleError<Course>(`getThisCourse error ${courseId} `))
      );
  }

  /**
   * This method is used to create an assignment for a given course
   * @param formCreateAssignment 
   */
  createAssignment(formCreateAssignment: FormData): Observable<Assignment> {
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


  setNextCourse(courseId: number) {
    this.currentCourseIdSubject.next(courseId);
    if (courseId == null) {
      console.log('setNextcourse !courseId')
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
  getEnrolledAvailableStudentsForCourse(courseId: number = this.currentCourseIdSubject.value): Observable<Student[]> {
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
   * Tis method returns all students of a courseh
   * @param courseId 
   */
  getEnrolledStudents(courseId: number = this.currentCourseIdSubject.value): Observable<Student[]> {
    const url = `${environment.base_url_course}/${courseId}/enrolled`;
    console.log('getEnrolledStudents course-service ', url)
    return this.httpClient
      .get<Student[]>(url).pipe(tap(() =>
          console.log(`getEnrolledStudents ok ${courseId}`)
        ),
        catchError(this.handleError<Student[]>(`getEnrolledStudents error ${courseId}`,[]))
      );
  }



  /**
   * This method is used to delete a course
   * @param courseId 
   */
  deleteCourse(courseId: number = this.currentCourseIdSubject.value) {
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
       console.log('createCourse success')
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
  enrollStudentToCourse(student: Student,courseId: number): Observable<Student> {
    const url =  `${environment.base_url_course}/${courseId}/enrollOne`
    console.log('800A enrollStudentToCourse ', student.id)
    const studentFormData = new FormData();
    studentFormData.append('studentId',student.id)
    return this.httpClient.post<Student>(url, studentFormData)
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
  enrollStudentsToCourse(students: Student[], courseId: number = this.currentCourseIdSubject.value): Observable<Student[]> {
    const temp$ = new Array<Observable<Student>>();
    students.forEach(student => temp$.push(this.enrollStudentToCourse(student, courseId)));
  return forkJoin(temp$);
  }


  /**
   * This method is used to unenroll a student from a course
   * @param student 
   * @param courseId 
   */
  unenrollStudentFromCourse(student: Student, courseId: number) {
    const url =  `${environment.base_url_course}/${courseId}/unenrollStudent`
    const studentFormData = new FormData();
    studentFormData.append('studentId',student.id)
    return this.httpClient.put<Student>(url,studentFormData)
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
  unenrollStudentsFromCourse(students: Student[], courseId: number = this.currentCourseIdSubject.value): Observable<Student[]> {
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
  getAssignmentsOfCourse(courseId: number): Observable<Assignment[]> {
    //    return of(this.exampleAssignments);
    const url = `${environment.base_url_course}/${courseId}/assignments`
    console.log(url)
    return this.httpClient.get<Assignment[]>(url)
      .pipe( tap(() =>
          console.log(`getAssignmentsOfCourse ok ${courseId}`)
        ),
        catchError(this.handleError<Assignment[]>(`getAssignmentsOfCourse(${courseId})`,[]))
      );
  }
    
  enrollStudentsToCourseWithCSV(csvFormData: FormData, courseId: number = this.currentCourseIdSubject.value) {
    const url = `${environment.base_url_course}/${courseId}/enrollMany`
    return this.httpClient.post<boolean[]>(url,csvFormData).pipe(
      tap((results) => {
        if(results.includes(false)) {
          console.log(`enrollStudentsToCourseWithCSV there are some students already enrolled in ${courseId}`)
        } else{
          console.log(`enrollStudentsToCourseWithCSV ok in ${courseId}`)
        }
      }
    ),catchError(
      this.handleError<boolean[]>(`enrollStudentsToCourseWithCSV ${courseId}`)
    ));
  }

  public getTeamsOfCourse(courseId: number = this.currentCourseIdSubject.value): Observable<Team[]> {
    const url = `${environment.base_url_course}/${courseId}/teams`;
    console.log('url vale' + url);
    /*return this.httpClient.get<Team[]>(url)
        .pipe(tap(() =>
                console.log(`getTeamsOfCourse ok ${courseId}`)
            ),
            catchError(this.handleError<any>(`getTeamsOfCourse(${courseId})`, []))
        );*/
    return of([
      new Team(
          'Gli Argonauti del Fosso dell\'Agonia Bianca',
          2,
          1,
          1,
          1,
          1,
          1,
          1,
          TeamStatus.ACTIVE
      ),
      new Team(
          'New Team1',
          3,
          1,
          1,
          1,
          1,
          1,
          1,
          TeamStatus.ACTIVE
      ),
      new Team(
          'New Team2',
          4,
          1,
          1,
          1,
          1,
          1,
          1,
          TeamStatus.ACTIVE
      )

    ]);
  }


  getVmInstancesOfTeam(teamId: number): Observable<VmInstanceModel[]> {
    return of([
      new VmInstanceModel(
          1,
          'lab1',
          3,
          500,
          500,
          VmInstanceStatus.RUNNING
      ),
      new VmInstanceModel(
          2,
          'lab2',
          3,
          500,
          500,
          VmInstanceStatus.RUNNING
      ),
      new VmInstanceModel(
          3,
          'lab3',
          3,
          500,
          500,
          VmInstanceStatus.SUSPENDED
      ),
    ]);
  }

    updateTeamVmResources(id: number, editedTeam: Team): Observable<Team> {
        // aspettare ad hamza che faccia l'endpoint POST
        return of(editedTeam);
    }

    getVmInstanceCreator(teamId: number, vmInstanceId: number): Observable<Student> {
        // /{courseId}/teams/{tid}/vmInstances/{vmid}/getCreator  ----> FARE LA GET
        const prova = new Student('260005', 'alex.pagano@studenti.polito.it', 'Alessandro', 'Pagano', 'A');
        return of(prova);
    }


    getVmInstanceOwners(tId: number, vmId: number): Observable<Student[]> {
        // "/{courseId}/teams/{tid}/vmInstances/{vmid}/getOwners"
        const url = `${environment.base_url_course}/${this.currentCourseIdSubject.value}/teams/${tId}/vmInstances/${vmId}/getOwners`;

        return this.httpClient.get<Student[]>(url)
            .pipe(tap(() =>
                    console.log(`getVmInstanceOwners`)
                ),
                catchError(this.handleError<Student[]>(`getVmInstanceOwners`, []))
            );

    }

    changeVmInstanceStatus(tId: number, vm: VmInstanceModel) {
        const url = `${environment.base_url_course}/${this.currentCourseIdSubject.value}/teams/${tId}/vmInstances/${vm.id}/command`;
        return this.httpClient.put<VmInstanceModel>(url, vm)
            .pipe(tap(() =>
                    console.log(`changeVmInstanceStatus`)
                ),
                catchError(this.handleError<VmInstanceModel>(`changeVmInstanceStatus`))
            );
    }

    deleteVmInstance(tId: number, vm: VmInstanceModel): Observable<boolean> {
        const url = `${environment.base_url_course}/${this.currentCourseIdSubject.value}/teams/${tId}/vmInstances/${vm.id}`;
        return this.httpClient.delete<boolean>(url)
            .pipe(tap(() =>
                    console.log(`changeVmInstanceStatus`)
                ),
                catchError(this.handleError<boolean>(`changeVmInstanceStatus`))
            );
    }
}
