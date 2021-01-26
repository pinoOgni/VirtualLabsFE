import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './modals/login-dialog/login-dialog.component';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {RegisterDialogComponent} from './modals/register-dialog/register-dialog.component';
import {User} from './models/user.model';
import {Course} from './models/course.model';
import {first} from 'rxjs/operators';
import {EditCourseDialogComponent} from './modals/edit-course-dialog/edit-course-dialog.component';
import {TeacherService} from './services/teacher.service';
import {StudentService} from './services/student.service';
import {VmModelsService} from './services/vm-models.service';
import {VmModel} from './models/vm-model.model';
import {AddCourseDialogComponent} from './modals/add-course-dialog/add-course-dialog.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

    // @ViewChild('sidenav') sidenav: MatSidenav;

    title = 'VirtualLabs';
    routeQueryParams$: Subscription;


    currentUser: User;
    course: Course;
    courses: Observable<Course[]>;
    navBarOpened = false;

    constructor(
        private vmModelsService: VmModelsService,
        private teacherService: TeacherService,
        private studentsService: StudentService,
        public dialog: MatDialog,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) {
        // Here we subscribe to the currentUser and then call the refillCourses method
        this.authService.getCurrentUserserObservable().subscribe((u: User) => {
            this.currentUser = u;
            if (u) {
                this.navBarOpened = true;
                this.refillCourses();
            }
        });

        this.routeQueryParams$ = route.queryParams.subscribe(params => {
            if (params.doLogin) {
                this.openDialogLogin();
            } else if (params.doRegister) {
                this.openDialogRegister();
            }
        });

    }

    ngOnInit(): void {
//    this.refillCourses();

    }

    ngOnDestroy() {
        this.routeQueryParams$.unsubscribe();
    }

    openDialogLogin() {
        const latestUrl = this.router.url;
        const dialogRef = this.dialog.open(LoginDialogComponent); // {disableClose: true}
        // First will deliver an EmptyError to the Observer's error callback if the Observable completes before any next notification was sent
        dialogRef.afterClosed().pipe(first()).subscribe(res => {
            if (res) {
                this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home',]);
                this.navBarOpened = true;

            } else if (latestUrl === this.router.url) {
                this.router.navigate(['/home']);
            }
        });
    }


    openDialogRegister() {
        const dialogRef = this.dialog.open(RegisterDialogComponent); // {disableClose: true}
        const latestUrl = this.router.url;
        dialogRef.afterClosed().pipe(first()).subscribe(res => {
            if (res) {
                this.router.navigate([this.route.snapshot.queryParams.returnUrl || '/home',]);
                this.navBarOpened = true;
            } else if (latestUrl === this.router.url) {
                this.router.navigate(['/home']);
            }
        });
    }

    logout() {
        this.dialog.closeAll();
        this.course = null;
        this.navBarOpened = false;
        this.authService.logout();
        this.router.navigate(['/home']);
    }

    public openDialogEditCourse(course: Course): void {
        let vmModel: VmModel;
        this.vmModelsService.getVmModelByCourseId(course.id).subscribe(
            //   this.vmModelsService.query().subscribe(
            result => {

                vmModel = result;
                console.log('vmModel: ' + typeof (result.courseId));
                const dialogRef = this.dialog.open(EditCourseDialogComponent, {
                    data: {
                        courseFullName: course.fullName,
                        courseAcronym: course.acronym,
                        maxStudents: course.maxStudentsForTeam,
                        minStudents: course.minStudentsForTeam,
                        enabled: course.enabled,
                        vModel: vmModel
                    }
                }); // {disableClose: true}

                dialogRef.afterClosed().subscribe(
                    result => {
                        if (result === undefined) {
                            return;
                        }
                        if (result.logged === true) {
                            const updatedCourse = result.newCourseModel;
                            // TODO gestire heldBy
                            const editedCourse = new Course(
                                course.id,
                                updatedCourse.acronym,
                                updatedCourse.fullName,
                                updatedCourse.minStudentsForTeam,
                                updatedCourse.maxStudentsForTeam,
                                updatedCourse.enabled);
                            const updatedVmModel = result.newVmModel;
                            const editedVmModel = new VmModel(
                                vmModel.id,
                                updatedVmModel.name,
                                vmModel.courseId,
                                updatedVmModel.vcpus,
                                updatedVmModel.diskSpace,
                                updatedVmModel.ramSize
                            );
                            this.teacherService.update(editedCourse).subscribe(
                                r => {
                                    this.refillCourses();
                                }
                            );
                            this.vmModelsService.update(editedVmModel).subscribe(
                                r => {
                                    console.log(r); // TODO aggiornare vmModel locale
                                }
                            );
                            this.router.navigate(['/home']);
                        }
                    }
                );
            }
        );


    }

    public openDialogAddCourse() {
        const dialogRef = this.dialog.open(AddCourseDialogComponent);

        dialogRef.afterClosed().subscribe(
            result => {
                if (result === undefined) {
                    return;
                }
                if (result.logged === true) {
                    const updatedCourse = result.newCourseModel;
                    // TODO gestire generazione id di course e vmModel
                    const editedCourse = new Course(
                        -1,
                        updatedCourse.acronym,
                        updatedCourse.fullName,
                        updatedCourse.minStudentsForTeam,
                        updatedCourse.maxStudentsForTeam,
                        updatedCourse.enabled);
                    const updatedVmModel = result.newVmModel;
                    const editedVmModel = new VmModel(
                        -1,
                        updatedVmModel.name,
                        -1,
                        updatedVmModel.vcpus,
                        updatedVmModel.diskSpace,
                        updatedVmModel.ramSize
                    );
                    this.teacherService.addCourse(editedCourse).subscribe(
                        r => {
                            console.log('Nuovo corso: ' + r);
                            this.refillCourses();
                        }
                    );
                    this.vmModelsService.addVmModel(editedVmModel).subscribe(
                        r => {
                            console.log(r); // TODO aggiornare vmModel locale
                        }
                    );

                }
            }
        );


    }

    private refillCourses() {
        if (this.currentUser) {
            if (this.currentUser.roles.includes('ROLE_STUDENT')) {
                this.courses = this.studentsService
                    .getCoursesOfStudentById(this.currentUser.email)  //this will be id??
                    .pipe(
                        first()
                    );
            }
            if (this.currentUser.roles.includes('ROLE_TEACHER')) {
                //     console.log('sto chiamando popopo');
                this.courses = this.teacherService.query()
                    .pipe(
                        first()
                    );
            }
            if (this.currentUser.roles.includes('ROLE_ADMIN')) {
                //     console.log('pocibomboli lembe');
                this.courses = this.teacherService.query()
                    .pipe(
                        first()
                    );
            }

        }
    }
}




