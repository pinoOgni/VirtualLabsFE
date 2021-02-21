import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {CourseService} from '../../services/course.service';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {MatDialog} from '@angular/material/dialog';
import {Student} from '../../models/student.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-vms',
    templateUrl: './vms.component.html',
    styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {
    @Input() team: Team;
    vmsInstances: VmInstanceModel[];
    usedVcpu: number;
    usedDisk: number;
    usedMemory: number;
    runningInstances: number;

    creators: Map<number, Student>;


    constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private courseService: CourseService) {
        this.usedVcpu = 0;
        this.usedDisk = 0;
        this.usedMemory = 0;
        this.runningInstances = 0;
        this.creators = new Map<number, Student>();


    }

  ngOnInit(): void {
      this.courseService.getVmInstancesOfTeam(this.team.id).subscribe(
          vmInstances => {
              this.vmsInstances = vmInstances;
              this.calculateUsedResources();
              this.vmsInstances.forEach(
                  vm => {

                      this.getVmCreator(this.team.id, vm.id).subscribe(
                          stud => this.creators.set(vm.id, stud)
                      );
                  }
              );
          }
      );
  }



  private calculateUsedResources(): void {
    this.usedVcpu = 0;
    this.usedDisk = 0;
    this.usedMemory = 0;
    this.runningInstances = 0;
    this.vmsInstances.forEach(
        y => {
          if (y.status === VmInstanceStatus.RUNNING) {
            this.usedVcpu += y.vcpu;
            this.usedDisk += y.disk;
            this.usedMemory += y.memory;
              this.runningInstances++;
          }
        }
    );

  }

    getVmCreator(teamId: number, vmInstanceId: number): Observable<Student> {
        return this.courseService.getVmInstanceCreator(teamId, vmInstanceId);
    }

    isRunning(vm: VmInstanceModel) {
        return vm.status === VmInstanceStatus.RUNNING;
    }
}
