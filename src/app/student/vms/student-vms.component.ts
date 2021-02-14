import {Component, OnInit} from '@angular/core';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Observable} from 'rxjs';
import {Student} from '../../models/student.model';
import {CourseService} from '../../services/course.service';
import {AuthService} from '../../auth/auth.service';
import {filter, first, flatMap, map, toArray} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditVmResourceSettingsComponent} from '../../modals/edit-vm-resource-settings/edit-vm-resource-settings.component';


@Component({
  selector: 'app-student-vms',
  templateUrl: './student-vms.component.html',
  styleUrls: ['./student-vms.component.css']
})
export class StudentVmsComponent implements OnInit {
  studentUsername: string;
  team: Team;
  vmInstances: VmInstanceModel[];
  currentUsedVcpus: number;
  currentUsedDiskSpace: number;
  currentUsedRam: number;
  currentRunningInstance: number;


  constructor(private dialog: MatDialog, private authService: AuthService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.currentRunningInstance = 0;
    this.currentUsedDiskSpace = 0;
    this.currentUsedVcpus = 0;
    this.currentUsedRam = 0;
    this.currentRunningInstance = 0;
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

  openModifyVmResourcesDialog(vm: VmInstanceModel) {
    const dialogRef = this.dialog.open(EditVmResourceSettingsComponent);

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

  openAddOwnersDialog(vm: VmInstanceModel, team: Team) {

  }

  isVmRunning(vm: VmInstanceModel): boolean {
    return vm.status === VmInstanceStatus.RUNNING;
  }
}
