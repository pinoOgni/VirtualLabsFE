import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Student} from 'src/app/models/student.model';
import {Team} from 'src/app/models/team.model';

@Component({
  selector: 'app-student-team',
  templateUrl: './student-team.component.html',
  styleUrls: ['./student-team.component.css']
})
/**
 * This class represents the tab TEAM id the student is in a team for that course
 */
export class StudentTeamComponent {

  teamName = '';
  dataSource = new MatTableDataSource<Student>();
  columnsToDisplay = ['firstName', 'lastName', 'id'];

  /**
   * Take the team form the container, we use to set the teamName
   */
  @Input() set team(team: Team) {
    this.teamName = team.name;
  }

  /**
   * Take the members of the team from the container
   */
  @Input() set members(members: Student[]) {
    this.dataSource.data = members;
  }
}
