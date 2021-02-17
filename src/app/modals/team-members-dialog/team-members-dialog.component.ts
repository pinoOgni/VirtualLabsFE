import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first, flatMap, map, mergeMap, toArray } from 'rxjs/operators';
import { MemberInfo } from 'src/app/models/member-info.model';
import { ProposalInfo } from 'src/app/models/proposal-info.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-members-dialog',
  templateUrl: './team-members-dialog.component.html',
  styleUrls: ['./team-members-dialog.component.css']
})
export class TeamMembersDialogComponent {

  /**
   * data source fot the list of members 
   */
  teamMembersDataSource = new MatTableDataSource<MemberInfo>();

  /**
   * Name of the proposal team
   */
  teamName: string;

  proposalInfo: ProposalInfo;

  columnsToDisplay = ['firstName', 'lastName', 'id', 'status']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TeamMembersDialogComponent>,
    public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    private teamService: TeamService) {

    this.proposalInfo = data.proposalInfo;
    this.teamName = data.teamName;
    this.teamService.getMembersOfProposalNotification(data.proposalInfo.id).pipe(
      first(),
      flatMap(x => x),
      map(students => {
        let memberInfo = new MemberInfo();
        memberInfo.id = students.id;
        memberInfo.firstName = students.firstName;
        memberInfo.lastName = students.lastName;
        memberInfo.status = this.proposalInfo.membersWithStatus.find(a => a.studentId == students.id).accepted.toString();
        return memberInfo;
      }),
      toArray()
    ).subscribe(
      (last) => {
        this.teamMembersDataSource.data = last
      }
    )



  }




}
