import {Component, Input, OnInit} from '@angular/core';
import {VmInstanceModel, VmInstanceStatus} from '../../models/vm-instance-model';
import {Team} from '../../models/team.model';
import {Student} from '../../models/student.model';
import {CourseService} from '../../services/course.service';
import {AuthService} from '../../auth/auth.service';
import {filter, first, flatMap, map, toArray} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditVmResourceSettingsComponent} from '../../modals/edit-vm-resource-settings/edit-vm-resource-settings.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewVmInstanceComponent} from 'src/app/modals/view-vm-instance/view-vm-instance.component';
import {AddOwnersVmInstanceComponent} from 'src/app/modals/add-owners-vm-instance/add-owners-vm-instance.component';
import {EditStudentVmInstanceDialogComponent} from '../../modals/edit-student-vm-instance-dialog/edit-student-vm-instance-dialog.component';
import {CreateNewVMInstanceDialogComponent} from '../../modals/create-new-vminstance-dialog/create-new-vminstance-dialog.component';
import {ConfirmationDialogComponent} from '../../modals/confirmation-dialog/confirmation-dialog.component';


@Component({
    selector: 'app-student-vms',
    templateUrl: './student-vms.component.html',
    styleUrls: ['./student-vms.component.css']
})
export class StudentVmsComponent implements OnInit {
    studentUsername: string;
    @Input()
    team: Team;

    vmInstances: VmInstanceModel[];
    currentUsedVcpus: number;
    currentUsedDiskSpace: number;
    currentUsedRam: number;
    currentRunningInstance: number;
    ownerIds: Map<number, string[]>;
    vmInstancesCreators: Map<number, Student>;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private authService: AuthService, private courseService: CourseService) {

    /**
     * Subscribe to all query params for the dialogs
     */
    this.route.queryParams.subscribe((queryParam) =>
        queryParam && queryParam.openVmInstanceStudent ? this.openVmInstanceContentDialog(queryParam.openVmInstanceStudent, queryParam.teamId) : null);

      this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.modifyVmResourcesStudent ? this.openEditVmResourcesDialog(queryParam.modifyVmResourcesStudent) : null);

      this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.addOwners ? this.openAddOwnersDialog(queryParam.addOwners, queryParam.teamId) : null);

      this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.addVmInstance ? this.openAddNewVmInstanceDialog() : null);

      this.route.queryParams.subscribe((queryParam) =>
          queryParam && queryParam.deleteVmInstance ? this.openConfirmationDialog(queryParam.toBeDeleted) : null);
  }

    ngOnInit(): void {
        this.ownerIds = new Map<number, string[]>();
        this.vmInstancesCreators = new Map<number, Student>();
        this.studentUsername = this.authService.currentUserValue.username;
        this.currentRunningInstance = 0;
        this.currentUsedDiskSpace = 0;
        this.currentUsedVcpus = 0;
        this.currentUsedRam = 0;
        this.currentRunningInstance = 0;
        this.courseService.getVmInstancesOfTeam(this.team.id).subscribe(
            vms => {
                this.vmInstances = vms;
                this.vmInstances.forEach(
                    vm => {
                        if (vm.status === VmInstanceStatus.RUNNING) {
                            this.currentRunningInstance++;
                        }
                        this.currentUsedDiskSpace += vm.disk;
                        this.currentUsedRam += vm.memory;
                        this.currentUsedVcpus += vm.vcpu;
                        this.courseService.getVmInstanceOwners(this.team.id, vm.id).pipe(
                            first(),
                            flatMap(x => x),
                            map(student => student.id),
                            toArray()
                        ).subscribe(
                            result => {
                                this.ownerIds.set(vm.id, result);
                            }
                        );
                        this.courseService.getVmInstanceCreator(this.team.id, vm.id).subscribe(
                            creator => {
                                this.vmInstancesCreators.set(vm.id, creator);
                            });
                        //    this.vmInstancesCreators.set(vm.id, this.courseService.getVmInstanceCreator(this.team.id, vm.id) );
                    }
                );
            }
        )


    }

    getVmInstances(): void {
        this.courseService.getVmInstancesOfTeam(this.team.id).subscribe(
            result => {
                this.vmInstances = result;
                this.vmInstances.forEach(
                    vm => {
                        if (vm.status === VmInstanceStatus.RUNNING) {
                            this.currentRunningInstance++;
                        }
                        this.currentUsedDiskSpace += vm.disk;
                        this.currentUsedRam += vm.memory;
                        this.currentUsedVcpus += vm.vcpu;
                        this.courseService.getVmInstanceOwners(this.team.id, vm.id).pipe(
                            first(),
                            flatMap(x => x),
                            map(student => student.id),
                            toArray()
                        ).subscribe(
                            result1 => {
                                this.ownerIds.set(vm.id, result1);
                            }
                        );
                        this.courseService.getVmInstanceCreator(this.team.id, vm.id).subscribe(
                            creator => {
                                this.vmInstancesCreators.set(vm.id, creator);
                            });
                        //    this.vmInstancesCreators.set(vm.id, this.courseService.getVmInstanceCreator(this.team.id, vm.id) );
                    }
                );
            }
        );
    }

    getVmCreator(teamId: number, vmInstanceId: number): Student {
        if (this.vmInstancesCreators !== null && this.vmInstancesCreators !== undefined) {
            return this.vmInstancesCreators.get(vmInstanceId);
        }
    }

    isOwner(tId: number, vmId: number): boolean {
        let out = false;


        if (this.ownerIds !== undefined && this.ownerIds !== null) {
            const ids = this.ownerIds.get(Number(vmId));
            if (ids !== undefined) {
                ids.forEach(
                    id => {
                        if (this.studentUsername === id) {
                            out = true;
                        }
                    });
            }
        }

        return out;


    }

    // delete? ALE
    openModifyVmResourcesDialog(vm: VmInstanceModel) {
        const dialogRef = this.dialog.open(EditVmResourceSettingsComponent);

    }

    turnOffVM(vm: VmInstanceModel) {
        //   vm.status = VmInstanceStatus.SUSPENDED;
        this.courseService.changeVmInstanceStatus(this.team.id, vm, 0).subscribe(
            r => {
                this.getVmInstances();
            }
        );
    }

  turnOnVM(vm: VmInstanceModel) {
      //  vm.status = VmInstanceStatus.RUNNING;
      this.courseService.changeVmInstanceStatus(this.team.id, vm, 1).subscribe(
          r => this.getVmInstances()
      );
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
  openEditVmResourcesDialog(vmId: number) {
      const vmInstance = this.vmInstances.find(vm => vm.id == vmId);
      console.log('openEditVmResourcesDialog: ' + vmInstance.name);
      const dialogRef = this.dialog.open(EditStudentVmInstanceDialogComponent, {
          data: {
              vmInstanceP: vmInstance,
          }
      });
      dialogRef.afterClosed().pipe(first()).subscribe(
          (result) => {
              if (result) {
                  console.log('result.ok, ', result.ok);
                  console.log('result.newTeam, ', result.newVmInstance);
                  const newInstance = result.newVmInstance;
                  this.courseService.changeVmInstanceResources(this.team.id, result.newVmInstance).subscribe(
                      vm => this.getVmInstances()
                  );
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
      let toBeShowed: Student[];
      this.courseService.getStudentsOfTeam(this.team.id).pipe(
          flatMap(x => x),
          //  map( student => student.id),
          filter(student => this.ownerIds.get(Number(vmId)).indexOf(student.id) < 0),
          toArray())
          .subscribe(
              x => {
                  toBeShowed = x;
                  const dialogRef = this.dialog.open(AddOwnersVmInstanceComponent, {
                      data: {
                          students: toBeShowed
                      }
                  });
                  dialogRef.afterClosed().subscribe(
                      result => {
                          // ALE Non so cosa vuoi farti ritornare
                          if (result === undefined) {
                              this.router.navigate([this.router.url.split('?')[0]]);
                              return;
                          }
                          if (result.ok) {
                              const output = result.students;
                              this.courseService.addOwnersToVmInstance(teamId, vmId, output).subscribe(
                                  y => {
                                      this.getVmInstances();


                                  }
                              );
                          }
                          toBeShowed = [];
                          this.router.navigate([this.router.url.split('?')[0]]);
                      }
                  );

              }
          );


  }


    private openAddNewVmInstanceDialog() {
        const dialogRef = this.dialog.open(CreateNewVMInstanceDialogComponent);

        dialogRef.afterClosed().subscribe(
            result => {
                if (result === undefined) {
                    this.router.navigate([this.router.url.split('?')[0]]);
                    return;
                }

                if (result.ok) {
                    const newVm = result.newVmInstance;
                    this.courseService.addNewVmInstance(this.team.id, newVm).subscribe(
                        result1 => this.getVmInstances()
                    );
                }

                this.router.navigate([this.router.url.split('?')[0]]);
            }
        );

        return;
    }

    private openConfirmationDialog(toBeDeleted: number) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => {
                if (result === undefined) {
                    this.router.navigate([this.router.url.split('?')[0]]);
                    return;
                }
                if (result.confirmed) {
                    const id = Number(toBeDeleted);
                    const tbd = this.vmInstances.find(x => x.id === id);
                    this.courseService.deleteVmInstance(this.team.id, tbd).subscribe(
                        s => this.getVmInstances()
                    );
                }
                this.router.navigate([this.router.url.split('?')[0]]);
            }
        );
    }
}
