import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from "../student.model";
import {StudentService} from "../services/student.service";


@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

  students: StudentModel[];
  enrolledStudents: StudentModel[];

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
          this.students = students as StudentModel[];
    });
  }

  getEnrolled(courseId: number): void {
    this.studentService.getEnrolled(courseId).subscribe(enrolledStudents => {
      this.enrolledStudents = enrolledStudents as StudentModel[];
    });
  }

  // TODO
  addStudent($student: StudentModel) {
    $student.courseId = 1;
    // Dopo ciascuna modifica si ricarichi la lista degli studenti iscritti dal server per averla aggiornata
    // inside the subscribe not outside!!
    this.studentService.update($student).subscribe(() => this.getEnrolled(1));
  }

  removeStudent($students: StudentModel[]): void {
    $students.forEach(s => s.courseId = 0);
    // Dopo ciascuna modifica si ricarichi la lista degli studenti iscritti dal server per averla aggiornata

    this.studentService.updateEnrolled($students).subscribe(() => this.getEnrolled(1));
  }
}
