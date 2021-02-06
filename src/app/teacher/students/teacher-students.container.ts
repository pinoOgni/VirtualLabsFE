import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, finalize, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { ProposalOfTeam } from 'src/app/models/proposal-of-team.model';
import { Proposal } from 'src/app/models/proposal.model';
import { Student } from 'src/app/models/student.model';
import { Team } from 'src/app/models/team.model';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { TeamService } from 'src/app/services/team.service';


@Component({
    selector: 'app-teacher-students-cont',
    templateUrl: './teacher-students.container.html',
})

/**
 * This component represents the container for the student's view, it will pass data to 
 * the teacher students component
 */
export class TeacherStudentsContComponent implements OnDestroy, OnInit {
    /**
     * last url
     */
    private lastUrl = ``;

    /**
     * The list of students entrolled in all course
     * In this way the teacher can add a student 
     */
    enrolledStudents: Student[] = []

    /**
     * A Subject is like an Observable, but can multicast to many Observers. 
     * Subjects are like EventEmitters: they maintain a registry of many listeners.
     * Is used for the unsubscription when the component is destroyed
     */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * list of students for the search. This list is updated each time there
     * is a change and is send to the teacher-students-component
     */
    searchedStudents: Observable<Student[]>;

    /**
     * Criteria emitter: used to refresh searchedStudents each time there is a change 
     */
    private searchOptions = new Subject<string>();

    navSubElement;

    //ALE HELP ME
    constructor(private router: Router, private studentService: StudentService, private courseService: CourseService) {
        this.navSubElement = this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (!this.lastUrl.includes(this.courseService.currentCourseIdSubject.value)) {
            this.refillEnrolledStudents();
          }
          this.lastUrl = event.url;
        });
    }

    /**
    * This method is used to push new options in the research 
    * Is used between the container and the student-no-team-component
    * @param name 
    */
    searchingStudentsByName(name: string): void {
        this.searchOptions.next(name);
    }



    /**
    * This method will call the method from the courseService
    * The courseId is taken by the service
    * @param students the list of students to be enrolled in a course 
    */
    enrollStudentsToCourse(students: Student[]) {
        this.courseService
            .enrollStudentsToCourse(students)
            .pipe(first(), finalize(() => this.refillEnrolledStudents())) //get again all students, update the view
            .subscribe();
    }

    /**
    * This method will call the method from the courseService
    * The courseId is taken by the service
    * @param students the list of students to be unenrolled from a course 
     */
    unenrollStudentsFromCourse(students: Student[]) {
        this.courseService.unenrollStudentsFromCourse(students)
        .pipe(first(),finalize(() => this.refillEnrolledStudents())) //get again all students, update the view
        .subscribe();
    }


    /**
     * 
     * @param formData 
     */
    enrollStudentsToCourseWithCsv(formData: FormData) { }

    /**
     * 
    */
    private refillEnrolledStudents() {
        // control if the current course is not undefined
        // ALE HELP ME
        if (!this.courseService.currentCourseIdSubject.value) {
            this.enrolledStudents = [];
            return;
        }
        this.courseService.getEnrolledStudents(this.courseService.currentCourseIdSubject.value)
            .pipe(first()).subscribe((enrolledStudents) => (this.enrolledStudents = enrolledStudents));
    }


    /**
     * Unsubscribe 
     */
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    ngOnInit() {
        //in the init phase of the component we need to subscribe to the searchOptions emitter,
        //then in this way a teacher can search students
        this.searchedStudents = this.searchOptions.pipe(
            takeUntil(this.destroy$),
            switchMap((name: string) => this.studentService.searchingStudentsByName(name)),
            map(students => students.filter(s => !this.enrolledStudents.map(e => e.id).includes(s.id)))
        );
    }






}