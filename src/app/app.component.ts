import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './modals/login-dialog/login-dialog.component';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { RegisterDialogComponent } from './modals/register-dialog/register-dialog.component';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { filter, first, flatMap, tap } from 'rxjs/operators';
import { EditCourseDialogComponent } from './modals/edit-course-dialog/edit-course-dialog.component';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { VmModelsService } from './services/vm-models.service';
import { AddCourseDialogComponent } from './modals/add-course-dialog/add-course-dialog.component';
import { ConfirmationDialogComponent } from './modals/confirmation-dialog/confirmation-dialog.component';
import { CourseService } from './services/course.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {


    title = 'VirtualLabs';

    /**
     * It is used to handle query params
     */
    routeQueryParams$: Subscription;

    /**
     * Represents the currently logged in user
     */
    currentUser: User;

    /**
     * Represents the course selected from the course list.
     */
    course: Course;
    /**
     * It represents the course list of a student or teacher that is displayed on the left
     */
    courses: Observable<Course[]>;

    /**
     * It is used to manage the navBar on the left
     */
    navBarOpened = false;

    constructor(
        private vmModelsService: VmModelsService,
        private teacherService: TeacherService,
        private studentsService: StudentService,
        private courseService: CourseService,
        public dialog: MatDialog,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) {

        /**
         * Here we subscribe to the currentUser and then call the refillCourses method
         */
        this.authService.getCurrentUserserObservable().subscribe((u: User) => {
            this.currentUser = u;
            this.refillCourses();
            if (u) {
                this.navBarOpened = true;
            }
        });

        /**
         * Based on the param query being read, a different dialog opens
         */
        this.routeQueryParams$ = route.queryParams.subscribe(params => {
            if (params.doLogin) {
                this.openDialogLogin();
            } else if (params.doRegister) {
                this.openDialogRegister();
            } else if (params.deleteCourse) {
                this.openDialogDeleteCourse(params.deleteCourse);
            } else if (params.addCourse) {
                this.openDialogAddCourse();
            } else if(params.editCourse) {
                this.openDialogEditCourse(params.editCourse);
            }
        });
        /**
         * Subscribe to the course in course service
         */
        this.courseService.course.asObservable().subscribe((c) => {
            this.course = c;
        });

        /**
         * This is to overcome the case where you have an open dialog and refresh the page.
         */
        this.router.events
            .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
            .subscribe(event => {
                if (
                    event.id === 1 &&
                    event.url === event.urlAfterRedirects
                ) {
                    this.router.navigate([this.router.url.split('?')[0]]);
                }
            })

    }

    /**
     * When the component is destroyed it destroys and unwrites everything
     */
    ngOnDestroy() {
        this.routeQueryParams$.unsubscribe();
    }


    /**
     * This method is used to open a user login dialog
     */
    openDialogLogin() {
        const latestUrl = this.router.url;
        const dialogRef = this.dialog.open(LoginDialogComponent); // {disableClose: true}
        // First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent
        dialogRef.afterClosed().pipe(first()).subscribe(res => {
            if (res) {
                this.router.navigate([this.route.snapshot.queryParams.returnedUrl || '/home',]);
                this.navBarOpened = true;

            } else if (latestUrl === this.router.url) {
                this.router.navigate(['/home']);
            }
        });
    }

    /**
     * This method is used to open the dialog for registering a user
     */
    openDialogRegister() {
        const dialogRef = this.dialog.open(RegisterDialogComponent); // {disableClose: true}
        const latestUrl = this.router.url;
        dialogRef.afterClosed().pipe(first()).subscribe(res => {
            if (res) {
                this.router.navigate([this.route.snapshot.queryParams.returnedUrl || '/home',]);
                this.navBarOpened = true;
            } else if (latestUrl === this.router.url) {
                this.router.navigate(['/home']);
            }
        });
    }

    /**
     * This method is used to log out, deleting everything and returning to the home
     */
    logout() {
        this.dialog.closeAll();
        this.course = null;
        this.navBarOpened = false;
        this.authService.logout();
        this.router.navigate(['/home']);
    }

    /**
     * This method is used to redirect to the persona page
     */
    account() {
        this.router.navigate([`/user/${this.currentUser.username}`])
    }


    /**
     * This method is used to open the dialog for editing a course
     * @param courseId 
     */
    public openDialogEditCourse(courseId: number): void {

        this.courses.pipe(
            flatMap(x => x),
            filter(c => c.id == courseId))
            .subscribe(
                found => {
                    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
                        data: {
                            editedCourse: found,
                        }
                    });
                    dialogRef.afterClosed().subscribe(
                        result => {
                            if (result === undefined) {
                                this.router.navigate([this.router.url.split('?')[0]]);
                                return;
                            }
                            if (result.logged) {
                                const editedCourse = result.editedCourse;

                                const newCourse = new Course(
                                    courseId,
                                    editedCourse.acronym,
                                    editedCourse.name,
                                    editedCourse.min,
                                    editedCourse.max,
                                    editedCourse.enabled,
                                    editedCourse.vcpu,
                                    editedCourse.disk,
                                    editedCourse.memory,
                                    editedCourse.maxVmInstance,
                                    editedCourse.maxRunningVmInstance);
                                this.teacherService.update(newCourse).subscribe(
                                    result1 => {
                                        this.refillCourses();
                                    }
                                );
                                this.router.navigate([this.router.url.split('?')[0]]);
                            }
                        }
                    );
                }
            )
    }

    /**
     * This method is used to open the dialog for adding a course
     */
    public openDialogAddCourse() {
        const dialogRef = this.dialog.open(AddCourseDialogComponent);

        dialogRef.afterClosed().subscribe(
            result => {
                if (result === undefined) {
                    this.router.navigate([this.router.url.split('?')[0]]);
                    return;
                }
                if (result.logged) {
                    const nCourse = result.newCourseModel;
                    const newCourse = new Course(
                        -1,
                        nCourse.acronym,
                        nCourse.name,
                        nCourse.min,
                        nCourse.max,
                        nCourse.enabled,
                        nCourse.vcpu,
                        nCourse.disk,
                        nCourse.memory,
                        nCourse.instances,
                        nCourse.runningInstances
                    );
                    this.teacherService.addCourse(newCourse).subscribe(
                        result1 => {
                            const vm = result.newVmModel;
                            this.vmModelsService.addVmModel(result1.id, vm).subscribe(
                                x => this.refillCourses()
                            );
                        }
                    );
                    this.router.navigate([this.router.url.split('?')[0]]);
                }
                this.router.navigate([this.router.url.split('?')[0]]);
            }
        );
    }

    /**
     * This method is used to open the dialog to confirm the deletion of a course
     * @param courseId 
     */
    openDialogDeleteCourse(courseId: number): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => {
                if (result === undefined) {
                    this.router.navigate(['/home']);
                    return;

                }
                if (result.confirmed === true) {
                    this.teacherService.deleteCourse(courseId).subscribe(
                        result1 => {
                            this.refillCourses();
                        }
                    );
                }
                this.router.navigate(['/home']);
            }
        );

    }

    /**
     * This method is used to retrieve the list of courses
     * of a student or teacher
     */
    private refillCourses(): void {
        if (this.currentUser) {
            if (this.currentUser.roles.includes('ROLE_STUDENT')) {
                // console.log('refill courses role student');
                this.courses = this.studentsService.getCoursesOfStudentById(this.currentUser.username)
                    .pipe(first(),
                        tap(() =>
                            console.log(`refill courses  getCoursesOfStudentById `)
                        ),
                    );
            } else if (this.currentUser.roles.includes('ROLE_TEACHER')) {
                this.courses = this.teacherService.getCoursesOfTeacherById(this.currentUser.username)
                    .pipe(first(),
                        tap(() =>
                            console.log(`refill courses  getCoursesOfTeacherById `)
                        ),
                    );
            }
        } else {
            this.courses = of([])
        }
    }




    
}




