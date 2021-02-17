/**
 * @param id: this is the id of the student
 * @param email: this is the email of the student
 * @param firstName: this is the firstname of the student
 * @param lastName: this is the lastName of the student
 */

export class Student {
    id: string;  // s200001
    email: string; // s200001@studenti.polito.it
    firstName: string; //Giacomo
    lastName: string; //Leopardi
    avatar: string | ArrayBuffer;
    

    constructor(id: string, email: string, firstName: string, lastName: string, avatar: string | ArrayBuffer) {
        this.avatar = avatar;
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    static toString(student: Student): string {
        return student.firstName + ' ' + student.lastName + ' id [ ' + student.id + ' ]';
      }
}
