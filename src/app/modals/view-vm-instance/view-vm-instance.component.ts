import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-view-vm-instance',
  templateUrl: './view-vm-instance.component.html',
  styleUrls: ['./view-vm-instance.component.css']
})
export class ViewVmInstanceComponent {

  vmInstanceUrl: SafeUrl;
  fileType: string;

  constructor(public dialogRef: MatDialogRef<ViewVmInstanceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { 
  this.fileType = data.type.split('/')[1]

    this.vmInstanceUrl = this.sanitizer.bypassSecurityTrustUrl(data.vmInstanceUrl);
}

}
