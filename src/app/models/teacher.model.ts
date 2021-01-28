/**
 * @param id: this is the id of the teacher
 * @param email: this is the email of the teacher
 * @param firstName: this is the firstname of the teacher
 * @param lastName: this is the lastName of the teacher
 */

export class Teacher {
    id: number;  //d200001
    email: string; //d200001@polito.it
    firstName: string; //Primo
    lastName: string; //Levi

    constructor(id: number, email: string, firstName: string, lastName: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    static toString(teacher: Teacher): string {
        return teacher.firstName + ' ' + teacher.lastName + 'id[' + teacher.id + ']';
      }
}
