import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-view-content-assignment',
  templateUrl: './view-content-assignment.component.html',
  styleUrls: ['./view-content-assignment.component.css']
})
export class ViewContentAssignmentComponent {

  /**
   * This is the name of the assignment to be displayed
   */
  name = ''
  assignmentUrl: SafeUrl;
  fileType: string;
  content: Promise<string> = null;

  constructor(public dialogRef: MatDialogRef<ViewContentAssignmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { 
    this.fileType = data.type.split('/')[1]
    console.log(' c.type ', data.type)
    console.log(' fileType ', this.fileType)
    if(this.fileType === 'txt') {
      data.content.then(text => {
          console.log(text);
          this.content = text
      })
      console.log(this.content)
    } else if(this.fileType === 'pdf') {
      this.assignmentUrl = data.assignmentUrl;
    } else {
      this.assignmentUrl = this.sanitizer.bypassSecurityTrustUrl(data.assignmentUrl)
    }

    this.name = data.name;
  }


  downloadAssignmentFile() {
    const a: any = document.createElement('a');
    a.href = this.data.assignmentUrl;
    a.download = this.data.name + '.' + this.fileType;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

}
