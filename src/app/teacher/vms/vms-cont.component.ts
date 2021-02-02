import {Component, OnInit} from '@angular/core';
import {Team} from '../../models/team.model';

@Component({
  selector: 'app-vms-cont',
  templateUrl: './vms-cont.component.html',
  styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {

  teams: Team[];

  constructor() {
  }

  ngOnInit(): void {

  }

}
