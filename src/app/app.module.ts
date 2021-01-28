import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatDividerModule} from '@angular/material/divider'; 
import { StudentsComponent } from './teacher/students/students.component';
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
import { StudentsContComponent } from './teacher/students/students-cont.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { VmsContComponent } from './teacher/vms/vms-cont.component';
import { VmsComponent } from './teacher/vms/vms.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginDialogComponent } from './modals/login-dialog/login-dialog.component';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { RegisterDialogComponent } from './modals/register-dialog/register-dialog.component';
import { VmsResourcesComponent } from './teacher/vms/vms-resources.component';
import { AssignmentsComponent } from './teacher/assignments/assignments.component';
import { AssignmentsContComponent } from './teacher/assignments/assignments-cont.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentNoTeamComponent } from './student/team/student-no-team.component';
import { StudentTeamComponent } from './student/team/student-team.component';
import { StudentTeamContComponent } from './student/team/student-team.container';
import { StudentVmsComponent } from './student/vms/student-vms.component';
import { StudentVmsContComponent } from './student/vms/student-vms.container';
import { StudentAssignmentsComponent } from './student/assignments/student-assignments.component';
import { StudentAssignmentsContComponent } from './student/assignments/student-assignments.container';
import { StudentComponent } from './student/student.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { EditCourseDialogComponent } from './modals/edit-course-dialog/edit-course-dialog.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";


import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsContComponent,
    PageNotFoundComponent,
    HomeComponent,
    VmsContComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    VmsComponent,
    VmsResourcesComponent,
    AssignmentsComponent,
    AssignmentsContComponent,
    TeacherComponent,
    StudentNoTeamComponent,
    StudentTeamComponent,
    StudentVmsComponent,
    StudentAssignmentsContComponent,
    StudentAssignmentsComponent,
    StudentVmsContComponent,
    StudentTeamContComponent,
    EditCourseDialogComponent,
    StudentComponent,
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
