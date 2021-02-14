import {Component, Inject, OnInit} from '@angular/core';
import {VmInstanceModel} from '../../models/vm-instance-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student-vm-instance-dialog',
  templateUrl: './edit-student-vm-instance-dialog.component.html',
  styleUrls: ['./edit-student-vm-instance-dialog.component.css']
})
export class EditStudentVmInstanceDialogComponent implements OnInit {
  vmInstance: VmInstanceModel;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
    vm: VmInstanceModel
  }) {
    this.vmInstance = data.vm;
  }

  ngOnInit(): void {
  }

}
