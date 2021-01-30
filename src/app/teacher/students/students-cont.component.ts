import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../models/student.model";
import {StudentService} from "../../services/student.service";


@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {
  students: Student[]; //all students
  enrolledStudents: Student[]; //enrolled students in this course

  constructor(private studentService: StudentService) {
    //altrimenti da errore il presentational
    this.students = [];
    this.enrolledStudents = [];
  }

  ngOnInit(): void {
    //TODO
  }

}
