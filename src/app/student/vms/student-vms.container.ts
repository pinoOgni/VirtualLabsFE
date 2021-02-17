import {Component, OnDestroy, OnInit} from '@angular/core';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Observable, Subject} from 'rxjs';
import {TeamService} from '../../services/team.service';
import {takeUntil, tap} from 'rxjs/operators';
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
  }

  ngOnInit() {
//    this.team  = this.teamService.getTeamOfStudent();
    this.teamService.currentTeamSubject
        .asObservable()
        .pipe(
            takeUntil(this.destroy$),
            tap(
                team => {
                  this.vmInstances = this.courseService.getVmInstancesOfTeam(team.id);
                }
            )
        )
        .subscribe((team) => {
              this.team = team;
            }
        );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isStudentJoinedToTeam() {
    return this.team !== undefined;
  }
}
