import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {StudentsContComponent} from "./teacher/students-cont.component";
import {VmsContComponent} from "./vms-cont/vms-cont.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'teacher/course', canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'applicazioni-internet/students', pathMatch: 'full'},
      { path: 'applicazioni-internet/students', component: StudentsContComponent},
      { path: 'applicazioni-internet/vms', component: VmsContComponent}
      ]},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
