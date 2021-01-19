import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {StudentsContComponent} from "./teacher/students/students-cont.component";
import {VmsContComponent} from "./teacher/vms/vms-cont.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth.guard";
import { AssignmentsContComponent } from './teacher/assignments/assignments-cont.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { StudentAssignmentsContComponent } from './student/assignments/student-assignments.container';
import { StudentVmsContComponent } from './student/vms/student-vms.container';
import { StudentTeamContComponent } from './student/team/student-team.container';
import {Role} from './models/role.model';
const routes  = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'teacher/courses/applicazioni-internet', //TODO :coursename 
    component: TeacherComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher, Role.Admin] },
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students', component: StudentsContComponent},
      { path: 'vms', component: VmsContComponent},
      { path: 'assignments', component: AssignmentsContComponent}
      ]
    },
    { path: 'student/courses/applicazioni-internet', //TODO :coursename 
    component: StudentComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Student, Role.Admin] },
    children: [
      { path: '', redirectTo: 'team', pathMatch: 'full'},
      { path: 'team', component: StudentTeamContComponent},
      { path: 'vms', component: StudentVmsContComponent},
      { path: 'assignments', component: StudentAssignmentsContComponent}
      ]
    },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
