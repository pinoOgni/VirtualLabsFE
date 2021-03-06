import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PdfViewerModule} from 'ng2-pdf-viewer';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatCardModule} from '@angular/material/card';
import {TeacherStudentsComponent} from './teacher/students/teacher-students.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {VmsContComponent} from './teacher/vms/vms-cont.component';
import {VmsComponent} from './teacher/vms/vms.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginDialogComponent} from './modals/login-dialog/login-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth/auth.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {RegisterDialogComponent} from './modals/register-dialog/register-dialog.component';
import {TeacherAssignmentsContComponent} from './teacher/assignments/teacher-assignments.container';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentNoTeamComponent} from './student/team/student-no-team.component';
import {StudentTeamComponent} from './student/team/student-team.component';
import {StudentTeamContComponent} from './student/team/student-team.container';
import {TeacherStudentsContComponent} from './teacher/students/teacher-students.container';
import {StudentVmsComponent} from './student/vms/student-vms.component';
import {StudentVmsContComponent} from './student/vms/student-vms.container';
import {StudentAssignmentsComponent} from './student/assignments/student-assignments.component';
import {StudentAssignmentsContComponent} from './student/assignments/student-assignments.container';
import {StudentComponent} from './student/student.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {EditCourseDialogComponent} from './modals/edit-course-dialog/edit-course-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {AddCourseDialogComponent} from './modals/add-course-dialog/add-course-dialog.component';
import {ConfirmationDialogComponent} from './modals/confirmation-dialog/confirmation-dialog.component'
import {MatNativeDateModule} from '@angular/material/core';
import {TeacherAssignmentsComponent} from './teacher/assignments/teacher-assignments.component';
import {CreateAssignmentComponent} from './modals/create-assignment/create-assignment.component';
import {ViewContentAssignmentComponent} from './modals/view-content-assignment/view-content-assignment.component';
import {ViewHomeworkVersionComponent} from './modals/view-homework-version/view-homework-version.component';
import {ScoreDialogComponent} from './modals/score-dialog/score-dialog.component';
import {ViewContentHomeworkVersionComponent} from './modals/view-content-homework-version/view-content-homework-version.component';
import {EditVmResourceSettingsComponent} from './modals/edit-vm-resource-settings/edit-vm-resource-settings.component';
import {MatBadgeModule} from '@angular/material/badge';
import {NewHomeworkVersionDialogComponent} from './modals/new-homework-version-dialog/new-homework-version-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {StudentNoTeamVmsComponent} from './student/vms/student-no-team-vms/student-no-team-vms.component';
import {EditStudentVmInstanceDialogComponent} from './modals/edit-student-vm-instance-dialog/edit-student-vm-instance-dialog.component';
import {TeamMembersDialogComponent} from './modals/team-members-dialog/team-members-dialog.component';
import {UserComponent} from './user/user.component';
import {ViewVmInstanceComponent} from './modals/view-vm-instance/view-vm-instance.component';
import {AddOwnersVmInstanceComponent} from './modals/add-owners-vm-instance/add-owners-vm-instance.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CreateNewVMInstanceDialogComponent} from './modals/create-new-vminstance-dialog/create-new-vminstance-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        TeacherStudentsComponent,
        PageNotFoundComponent,
        HomeComponent,
        VmsContComponent,
        LoginDialogComponent,
        RegisterDialogComponent,
    VmsComponent,
    TeacherAssignmentsContComponent,
    TeacherComponent,
    StudentNoTeamComponent,
    StudentTeamComponent,
    StudentVmsComponent,
    StudentAssignmentsContComponent,
    StudentAssignmentsComponent,
    StudentVmsContComponent,
    
        StudentTeamContComponent,
        TeacherStudentsContComponent,
        EditCourseDialogComponent,
        StudentComponent,
        AddCourseDialogComponent,
        TeacherAssignmentsComponent,
        CreateAssignmentComponent,
        ViewContentAssignmentComponent,
        ViewHomeworkVersionComponent,
        ScoreDialogComponent,
        ViewContentHomeworkVersionComponent,
        EditVmResourceSettingsComponent,
        NewHomeworkVersionDialogComponent,
        StudentNoTeamVmsComponent,
        EditStudentVmInstanceDialogComponent,
        TeamMembersDialogComponent,
        ConfirmationDialogComponent,
        UserComponent,
        ViewVmInstanceComponent,
        AddOwnersVmInstanceComponent,
        CreateNewVMInstanceDialogComponent,
    ],
    imports: [
        MatNativeDateModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSortModule,
        MatCardModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatTabsModule,
        MaterialFileInputModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSelectModule,
        MatBadgeModule,
        MatDatepickerModule,
        PdfViewerModule,
        MatGridListModule,
        MatSnackBarModule
    ],
    exports:[
        MatDatepickerModule,
        MatMenuModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent]
})
export class AppModule { }
