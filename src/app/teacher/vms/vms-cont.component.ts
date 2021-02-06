import {Component, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {TeacherService} from '../../services/teacher.service';
import {CourseService} from '../../services/course.service';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-vms-cont',
  templateUrl: './vms-cont.component.html',
  styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {

  teams: Team[];

  constructor(private teamService: TeamService, private courseService: CourseService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    console.log('sono un ciumbolombolo');
    this.courseService.getTeamsOfCourse().subscribe(
        x => console.log('ciombolo: ' + x)
    );
  }

}
