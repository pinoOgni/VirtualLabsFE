import {Component, OnDestroy, OnInit} from '@angular/core';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Observable, Subject} from 'rxjs';
import {TeamService} from '../../services/team.service';
import {flatMap, takeUntil} from 'rxjs/operators';
import {CourseService} from '../../services/course.service';


@Component({
    selector: 'app-student-vms-cont',
    templateUrl: './student-vms.container.html'
})
export class StudentVmsContComponent implements OnDestroy {
    team$: Observable<Team>;
    team: Team;
    vmInstances: Observable<VmInstanceModel[]>;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private isTeam = false;


    constructor(private courseService: CourseService, private teamService: TeamService) {
        this.teamService.currentTeamSubject
            .asObservable()
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((team) => {
                    this.team = team;
                    if (team !== null) {
                        // this.vmInstances = this.courseService.getVmInstancesOfTeam(team.id);
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
      return output;
  }

    getVmInstances(): Observable<VmInstanceModel[]> {
        return this.team$.pipe(
            flatMap(x => this.courseService.getVmInstancesOfTeam(x.id))
        );
    }

    isInTeam() {
        return this.isTeam;
    }
}
