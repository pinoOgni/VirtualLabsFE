/**
 * @param id: this is the id of the student
 * @param email: this is the email of the student
 * @param firstName: this is the firstname of the student
 * @param lastName: this is the lastName of the student
 * @param courseId the id of the course where the student is enrolled to (0 if none)
 * @param teamId the id of the team where the student belongs to (0 if none)
 */

import { ThrowStmt } from "@angular/compiler";

export class Student {
    id: number;  // 1 
    email: string; // s200001@studenti.polito.it
    firstName: string; //Giacomo
    lastName: string; //Leopardi
    //remove later
    courseId: number; //1
    teamId: number; //1

    constructor(id: number, email: string, firstName: string, lastName: string,  courseId?: number, teamId?: number) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.courseId = courseId;
        this.teamId = teamId;
    }


    static toString(student: Student): string {
        return student.firstName + ' ' + student.lastName + 'id[' + student.id + ']';
      }
}
