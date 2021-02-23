import {Component, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';
import {TeacherService} from '../../services/teacher.service';
import {CourseService} from '../../services/course.service';
import {TeamService} from '../../services/team.service';
import {Observable} from 'rxjs';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {VmModelsService} from '../../services/vm-models.service';
import {EditVmResourceSettingsComponent} from '../../modals/edit-vm-resource-settings/edit-vm-resource-settings.component';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-vms-cont',
    templateUrl: './vms-cont.component.html',
    styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {


    teams: Observable<Team[]>;

    constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private vmModelService: VmModelsService, private teamService: TeamService, private courseService: CourseService, private teacherService: TeacherService) {

        this.route.queryParams.subscribe((queryParam) =>
            queryParam && queryParam.modifyVmResourcesTeacher ? this.openEditVmResourcesDialog(queryParam.modifyVmResourcesTeacher) : null);
    }

    ngOnInit(): void {
        this.teams = this.courseService.getTeamsOfCourse();

    }

    getTeamVmsInstances(teamId: number): Observable<VmInstanceModel[]> {
        return this.courseService.getVmInstancesOfTeam(teamId);
    }

    openEditVmResourcesDialog(teamId: number): void {

        const team = this.teams.pipe(
            flatMap(x => x),
            filter(a => a.id == teamId))
            .subscribe(
                found => {

                    const dialogRef = this.dialog.open(EditVmResourceSettingsComponent, {
                        data: {
                            t: found
                        }
                    });
                    dialogRef.afterClosed().subscribe(
                        result => {
                            if (result === undefined) {
                                this.router.navigate([this.router.url.split('?')[0]]);
                                return;
                            }
                            if (result.ok) {
                                // TODO gestire ritorno della richiesta se le risorse vanno bene
                                const editedTeam = result.newTeam;
                                this.courseService.updateTeamVmResources(found.id, editedTeam).subscribe(
                                    x => {
                                        //    this.calculateUsedResources(x);
                                        this.refreshTeams();
                                    }
                                );
                            }
                            this.router.navigate([this.router.url.split('?')[0]]);
                        }
                    );
                }
            );


    }


    private refreshTeams() {
        this.teams = this.courseService.getTeamsOfCourse();
    }
}


