import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {CourseService} from '../../services/course.service';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {MatDialog} from '@angular/material/dialog';
import {EditVmResourceSettingsComponent} from '../../modals/edit-vm-resource-settings/edit-vm-resource-settings.component';
import {Student} from '../../models/student.model';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {
  @Input() team: Team;
  @Input() vmsInstances: VmInstanceModel[];
  usedVcpu: number;
  usedDisk: number;
  usedMemory: number;
  runningInstances: number;


  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private courseService: CourseService) {
    this.usedVcpu = 0;
    this.usedDisk = 0;
    this.usedMemory = 0;
    this.runningInstances = 0;


    this.route.queryParams.subscribe((queryParam) =>
    queryParam && queryParam.modifyVmResourcesTeacher ? this.openEditVmResourcesDialog() : null );

  }

  ngOnInit(): void {
    this.calculateUsedResources();
  }

  openEditVmResourcesDialog(): void {
    const dialogRef = this.dialog.open(EditVmResourceSettingsComponent, {
      data: {
        t: this.team
      }
    });
    dialogRef.afterClosed().subscribe(
        result => {
          if (result === undefined) {
            return;
          }
          if (result.ok) {
            // TODO gestire ritorno della richiesta se le risorse vanno bene
            const editedTeam = result.newTeam;
            this.courseService.updateTeamVmResources(this.team.id, editedTeam).subscribe(
                x => this.calculateUsedResources()
            );
          }
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
}
