import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  /**
   * links used in teacher-component.html in ngFor to go to the correct tab
   */
  teacherLinks = [
    { label: 'Students', path: 'students' },
    { label: 'Vms', path: 'vms' },
    { label: 'Assignments', path: 'assignments' },
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
