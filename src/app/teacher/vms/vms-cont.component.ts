import {Component, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {TeacherService} from '../../services/teacher.service';
import {CourseService} from '../../services/course.service';
import {TeamService} from '../../services/team.service';
import {Observable} from 'rxjs';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {VmModelsService} from '../../services/vm-models.service';


@Component({
  selector: 'app-vms-cont',
  templateUrl: './vms-cont.component.html',
  styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {


  teams: Observable<Team[]>;

  constructor(private vmModelService: VmModelsService, private teamService: TeamService, private courseService: CourseService, private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    console.log('sono un ciumbolombolo');
    this.teams = this.courseService.getTeamsOfCourse();

  }

  getTeamVmsInstances(teamId: number): Observable<VmInstanceModel[]> {
    return this.courseService.getVmInstancesOfTeam(teamId);
  }


}


