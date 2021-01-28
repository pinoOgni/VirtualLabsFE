/**
 * @param id: this is the id of the student
 * @param email: this is the email of the student
 * @param firstName: this is the firstname of the student
 * @param lastName: this is the lastName of the student
 * @param teamId the id of the team where the student belongs to (0 if none)
 */

import { ThrowStmt } from "@angular/compiler";

export class Student {
    id: string;  // s200001
    email: string; // s200001@studenti.polito.it
    firstName: string; //Giacomo
    lastName: string; //Leopardi
    

    constructor(id: string, email: string, firstName: string, lastName: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    static toString(student: Student): string {
        return student.firstName + ' ' + student.lastName + 'id[' + student.id + ']';
      }
}
