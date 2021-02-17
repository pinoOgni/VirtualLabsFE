import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  student: Student;
  teacher: Teacher;

  constructor(private authService: AuthService, private studentService: StudentService, private teacherService: TeacherService) { 
    if(this.authService.currentUserValue.roles.includes('ROLE_STUDENT')) {
      console.log('student');
      this.studentService.getStudent(this.authService.currentUserValue.username).pipe(first())
      .subscribe((s) => this.student = s);
    } else if(this.authService.currentUserValue.roles.includes('ROLE_TEACHER')) {
      console.log('teacher');
      this.teacherService.getTeacher(this.authService.currentUserValue.username).pipe(first())
      .subscribe((t) => this.teacher = t);
    }

  }

  ngOnInit(): void {


  }



}
