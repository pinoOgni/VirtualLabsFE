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

  //TODO nel progetto
  courseId: number = 1;

  constructor(private studentService: StudentService) {
    //altrimenti da errore il presentational
    this.students = [];
    this.enrolledStudents = [];
  }

  ngOnInit(): void {
    this.getStudents();
    this.getEnrolled(this.courseId); //in this case we have only one course
  }

  getStudents(): void {
    this.studentService.query().subscribe(students => {
          this.students = students as Student[];
    });
  }

  getEnrolled(courseId: number): void {
    this.studentService.getEnrolled(courseId).subscribe(enrolledStudents => {
      this.enrolledStudents = enrolledStudents as Student[];
    });
  }

  // TODO
  addStudent($student: Student) {
    $student.courseId = 1;
    // Dopo ciascuna modifica si ricarichi la lista degli studenti iscritti dal server per averla aggiornata
    // inside the subscribe not outside!!
    this.studentService.update($student).subscribe(() => this.getEnrolled(1));
  }

  removeStudent($students: Student[]): void {
    $students.forEach(s => s.courseId = 0);
    // Dopo ciascuna modifica si ricarichi la lista degli studenti iscritti dal server per averla aggiornata

    this.studentService.updateEnrolled($students).subscribe(() => this.getEnrolled(1));
  }
}
