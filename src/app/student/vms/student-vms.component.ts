import {Component, Input, OnInit} from '@angular/core';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Observable} from 'rxjs';
import {Student} from '../../models/student.model';
import {CourseService} from '../../services/course.service';
import {AuthService} from '../../auth/auth.service';
import {filter, first, flatMap, map, toArray} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditVmResourceSettingsComponent} from '../../modals/edit-vm-resource-settings/edit-vm-resource-settings.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewVmInstanceComponent } from 'src/app/modals/view-vm-instance/view-vm-instance.component';
import { AddOwnersVmInstanceComponent } from 'src/app/modals/add-owners-vm-instance/add-owners-vm-instance.component';


@Component({
  selector: 'app-student-vms',
  templateUrl: './student-vms.component.html',
  styleUrls: ['./student-vms.component.css']
})
export class StudentVmsComponent implements OnInit {
  studentUsername: string;
  @Input()
  team: Team;
  @Input()
  vmInstances: VmInstanceModel[];
  currentUsedVcpus: number;
  currentUsedDiskSpace: number;
  currentUsedRam: number;
  currentRunningInstance: number;


  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private authService: AuthService, private courseService: CourseService) {
    
    /**
     * Subscribe to all query params for the dialogs
     */
    this.route.queryParams.subscribe((queryParam) => 
    queryParam && queryParam.openVmInstance ? this.openVmInstanceContentDialog(queryParam.openVmInstance, queryParam.teamId) : null );

    this.route.queryParams.subscribe((queryParam) => 
    queryParam && queryParam.modifyVmResources ? this.openEditVmResourcesDialog(queryParam.modifyVmResources, queryParam.teamId) : null );

    this.route.queryParams.subscribe((queryParam) => 
    queryParam && queryParam.addOwners ? this.openAddOwnersDialog(queryParam.addOwners, queryParam.teamId) : null );
  }

  ngOnInit(): void {
    this.currentRunningInstance = 0;
    this.currentUsedDiskSpace = 0;
    this.currentUsedVcpus = 0;
    this.currentUsedRam = 0;
    this.currentRunningInstance = 0;
    if (this.vmInstances !== null && this.vmInstances !== undefined) {
      this.vmInstances.forEach(
          vm => {
            if (vm.status === 'RUNNING') {
              this.currentRunningInstance++;
            }
            this.currentUsedDiskSpace += vm.disk;
            this.currentUsedRam += vm.memory;
            this.currentUsedVcpus += vm.vcpu;
          }
      );
    }

    this.authService.getCurrentUserserObservable().subscribe(
        u => this.studentUsername = u.username
    );

  }

  getVmCreator(teamId: number, vmInstanceId: number): Observable<Student> {
    return this.courseService.getVmInstanceCreator(teamId, vmInstanceId);
  }

  isOwner(tId: number, vmId: number): boolean {
    let output = 0;
    this.courseService.getVmInstanceOwners(tId, vmId).pipe(
        first(),
        flatMap(x => x),
        map(student => student.id),
        filter(id => id === this.studentUsername),
        toArray()
    ).subscribe(
        res => output = res.length
    );
    return output > 0;
  }


  turnOffVM(vm: VmInstanceModel) {
    vm.status = VmInstanceStatus.SUSPENDED;
    this.courseService.changeVmInstanceStatus(this.team.id, vm);
  }

  turnOnVM(vm: VmInstanceModel) {
    vm.status = VmInstanceStatus.RUNNING;
    this.courseService.changeVmInstanceStatus(this.team.id, vm);
  }

  deleteVM(vm: VmInstanceModel) {
    this.courseService.deleteVmInstance(this.team.id, vm);
  }

  isVmRunning(vm: VmInstanceModel): boolean {
    return vm.status === VmInstanceStatus.RUNNING;
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
      console.log('blob text', c.text())
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

  /**
   * This method is used to open the dialog to edit vm resources
   * @param vmId 
   * @param teamId 
   */
  openEditVmResourcesDialog(vmId: number, teamId: number) {
    const dialogRef = this.dialog.open(EditVmResourceSettingsComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().pipe(first()).subscribe(
      (result) => {
        if (result) {
            console.log('result.ok, ', result.ok);
            console.log('result.newTeam, ', result.newTeam);
        }
        this.router.navigate([this.router.url.split('?')[0]]);
      }
    )
  }

  /**
   * This method is used to open a dialog to add owners to a vm instance
   * @param vmId 
   * @param teamId 
   */
  openAddOwnersDialog(vmId: number, teamId: number) {
    const dialogRef = this.dialog.open(AddOwnersVmInstanceComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().pipe(first()).subscribe(
      (result) => {
        // ALE Non so cosa vuoi farti ritornare
        this.router.navigate([this.router.url.split('?')[0]]);
      }
    )
  }


}
