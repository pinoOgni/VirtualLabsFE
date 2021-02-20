import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Student} from '../../models/student.model';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-add-owners-vm-instance',
    templateUrl: './add-owners-vm-instance.component.html',
    styleUrls: ['./add-owners-vm-instance.component.css']
})
export class AddOwnersVmInstanceComponent implements OnInit {

    students: { student: Student, checked: boolean }[] = [];

    constructor(@Inject(MAT_DIALOG_DATA)
                public data: {
        students: Student[]
    }, private dialogRef: MatDialogRef<AddOwnersVmInstanceComponent>) {

        data.students.forEach(
            s => {
                this.students.push({
                    student: s,
                    checked: false
                });
            }
        );
    }

    ngOnInit(): void {
    }


    check($event: MatCheckboxChange, stud: { student: Student; checked: boolean }) {
        stud.checked = $event.checked;
        console.log(stud.checked);
    }

    confirm() {
        const out = [];
        this.students.forEach(
            s => {
                if (s.checked) {
                    out.push(s.student.id);
                }
            }
        );
        this.dialogRef.close({
            ok: true,
            students: out
        });
    }

    cancel() {
        this.dialogRef.close({
            ok: false
        });
    }
}
