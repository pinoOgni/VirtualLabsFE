import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {CourseService} from '../../services/course.service';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {MatDialog} from '@angular/material/dialog';
import {Student} from '../../models/student.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { ViewVmInstanceComponent } from 'src/app/modals/view-vm-instance/view-vm-instance.component';


@Component({
  selector: 'app-vms',
    templateUrl: './vms.component.html',
    styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {

    /**
     * Current team
     */
    @Input() team: Team;

    /**
     * List of vm instance model
     */
    vmsInstances: VmInstanceModel[];

    /**
     * Resources
     */
    usedVcpu: number;
    usedDisk: number;
    usedMemory: number;
    runningInstances: number;

    /**
     * List of creators
     */
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


  /**
   * This method calculates the amount of resources currently used by the
   * running vm instances
   */
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


  /**
   * This method is used to recover the creator of the vm instance
   * @param teamId 
   * @param vmInstanceId 
   */
    getVmCreator(teamId: number, vmInstanceId: number): Observable<Student> {
        return this.courseService.getVmInstanceCreator(teamId, vmInstanceId);
    }

    /**
     * This method is used to check if the vm instance is running
     * @param vm 
     */
    isRunning(vm: VmInstanceModel) {
        return vm.status === VmInstanceStatus.RUNNING;
    }
}
