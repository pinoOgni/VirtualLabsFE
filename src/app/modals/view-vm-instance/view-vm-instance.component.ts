import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-vm-instance',
  templateUrl: './view-vm-instance.component.html',
  styleUrls: ['./view-vm-instance.component.css']
})
export class ViewVmInstanceComponent  {

  image: string | ArrayBuffer;
  imageUrl: string = "/API/courses/11/teams/34/vmInstances/37/show"
  constructor(public dialogRef: MatDialogRef<ViewVmInstanceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { 
  
    this.image = data.contentArrayBuffer;
}


downloadAssignmentFile() {
  const a: any = document.createElement('a');
  a.href = this.data.assignmentUrl;
  a.download = 'ciao.png';
  document.body.appendChild(a);
  a.style = 'display: none';
  a.click();
  a.remove();
}


}
