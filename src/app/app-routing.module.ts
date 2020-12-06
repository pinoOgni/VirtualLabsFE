import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {StudentsContComponent} from "./teacher/students/students-cont.component";
import {VmsContComponent} from "./teacher/vms/vms-cont.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth.guard";
import { AssignmentsContComponent } from './teacher/assignments/assignments-cont.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'teacher/course/applicazioni-internet', 
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students', component: StudentsContComponent},
      { path: 'vms', component: VmsContComponent},
      { path: 'assignments', component: AssignmentsContComponent}
      ]
    },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
