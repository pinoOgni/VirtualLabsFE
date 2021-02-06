import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
import {VmsResourcesComponent} from './teacher/vms/vms-resources.component';
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

import {EditCourseDialogComponent} from './modals/edit-course-dialog/edit-course-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {AddCourseDialogComponent} from './modals/add-course-dialog/add-course-dialog.component';

import {MatNativeDateModule} from '@angular/material/core';
import { TeacherAssignmentsComponent } from './teacher/assignments/teacher-assignments.component';
import { CreateAssignmentComponent } from './modals/create-assignment/create-assignment.component';
import { ViewContentAssignmentComponent } from './modals/view-content-assignment/view-content-assignment.component';
import { ViewHomeworkVersionComponent } from './modals/view-homework-version/view-homework-version.component';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { ViewContentHomeworkVersionComponent } from './view-content-homework-version/view-content-homework-version.component';

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
    VmsResourcesComponent,
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
      ViewContentHomeworkVersionComponent
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
        MatTableModule,
        AppRoutingModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule

    ],
    exports:[
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent]
})
export class AppModule { }
