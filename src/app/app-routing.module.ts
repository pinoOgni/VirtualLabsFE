import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VmsContComponent} from './teacher/vms/vms-cont.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';
import { TeacherAssignmentsContComponent } from './teacher/assignments/teacher-assignments.container';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { StudentAssignmentsContComponent } from './student/assignments/student-assignments.container';
import { StudentVmsContComponent } from './student/vms/student-vms.container';
import { StudentTeamContComponent } from './student/team/student-team.container';
import {Role} from './models/role.model';
import { TeacherStudentsContComponent } from './teacher/students/teacher-students.container';
import { UserComponent } from './user/user.component';
const routes  = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'teacher/courses/:courseId',
    component: TeacherComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher, Role.Admin] },
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students', component: TeacherStudentsContComponent},
      { path: 'vms', component: VmsContComponent},
      { path: 'assignments', component: TeacherAssignmentsContComponent}
      ]
    },
    { path: 'student/courses/:courseId',
    component: StudentComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Role.Student, Role.Admin] },
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full'},
      { path: 'teams', component: StudentTeamContComponent},
      { path: 'vms', component: StudentVmsContComponent},
      { path: 'assignments', component: StudentAssignmentsContComponent}
      ]
    },
  {
    path: 'user/:userId',
    component: UserComponent,
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
