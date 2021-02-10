import { NumberSymbol } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-content-homework-version',
  templateUrl: './view-content-homework-version.component.html',
  styleUrls: ['./view-content-homework-version.component.css']
})
export class ViewContentHomeworkVersionComponent {


  homeworkVersionUrl: SafeUrl;
  fileType: string;
  content: Promise<string> = null;

  constructor(public dialogRef: MatDialogRef<ViewContentHomeworkVersionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    this.fileType = data.type.split('/')[1]
    console.log(' c.type ', data.type)
    console.log(' fileType ', this.fileType)
    if (this.fileType === 'txt') {
      data.content.then(text => {
        console.log(text);
        this.content = text
      })
    } else if (this.fileType === 'pdf') {
      this.homeworkVersionUrl = data.homeworkVersionUrl;
    } else {
      this.homeworkVersionUrl = this.sanitizer.bypassSecurityTrustUrl(data.homeworkVersionUrl)
    }
  }


  downloadHomeworVersionFile() {
    const a: any = document.createElement('a');
    a.href = this.data.homeworkVersionUrl;
    a.download = this.data.homeworkVersionName + '.' + this.fileType;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

}
