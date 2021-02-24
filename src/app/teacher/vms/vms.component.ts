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
        
        this.route.queryParams.subscribe((queryParam) => {
          queryParam && queryParam.openVmInstanceTeacher ? this.openVmInstanceContentDialog(queryParam.openVmInstanceTeacher, queryParam.teamId) : null;
        });
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
   * This method is used to create dialog to see the VM instance
   * @param vmId
   * @param teamId
   */
  openVmInstanceContentDialog(vmId: number, teamId: number) {
    this.courseService.getContentVmInstance(teamId,vmId).pipe(first()).subscribe(c => {
      if (!c) {
        this.router.navigate([this.router.url.split('?')[0]]);
        return;
      }
      const url = URL.createObjectURL(c);
      const dialogRef = this.dialog.open(ViewVmInstanceComponent, {
        data: {
          type: c.type,
          vmInstanceUrl: url,
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        URL.revokeObjectURL(url);
        this.router.navigate([this.router.url.split('?')[0]]);
      });
    });
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
