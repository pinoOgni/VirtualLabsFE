import {Component, OnDestroy, OnInit} from '@angular/core';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Observable, Subject} from 'rxjs';
import {TeamService} from '../../services/team.service';
import {takeUntil} from 'rxjs/operators';
import {CourseService} from '../../services/course.service';


@Component({
  selector: 'app-student-vms-cont',
  templateUrl: './student-vms.container.html'
})
export class StudentVmsContComponent implements OnInit, OnDestroy {
  team: Team;
  vmInstances: Observable<VmInstanceModel[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private courseService: CourseService, private teamService: TeamService) {
      /*this.teamService.currentTeamSubject
          .asObservable()
          .pipe(
              takeUntil(this.destroy$)
          )
          .subscribe((team) => {
                  this.team = team;
                  if ( team !== null ){

                      this.vmInstances = this.courseService.getVmInstancesOfTeam(team.id);
                  }


              }
          );*/
  }

  ngOnInit() {
//    this.team  = this.teamService.getTeamOfStudent();
      this.teamService.currentTeamSubject
          .asObservable()
          .pipe(takeUntil(this.destroy$))
          .subscribe((team) => {
                  this.team = team;
                  if (team != null) {
                      console.log('student-team-contatiner currentTeamSubject ', team.name);
                      this.vmInstances = this.courseService.getVmInstancesOfTeam(team.id);
                  }
              }
          );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isStudentJoinedToTeam() {
      let output = false;
      this.teamService.currentTeamSubject
          .asObservable()
          .pipe(
              takeUntil(this.destroy$)
          )
          .subscribe((team) => {
                  output = (team !== null);
              }
          );
      console.log('pelopelo sono output ' + output);
      return output;
  }

    getVmInstances(): Observable<VmInstanceModel[]> {
        return this.vmInstances;
    }
}
