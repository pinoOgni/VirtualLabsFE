/**
 * @param id: this is the id of the teacher
 * @param email: this is the email of the teacher
 * @param firstName: this is the firstname of the teacher
 * @param lastName: this is the lastName of the teacher
 * @param courseId: this is the id of the course of this teacher
 */

export class Teacher {
    id: number;  //1
    email: string; //d200001@polito.it
    firstName: string; //Primo
    lastName: string; //Levi
    //remove later
    courseId: number; //1

    constructor(id: number, email: string, firstName: string, lastName: string,  courseId: number) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.courseId = courseId;
    }


    static toString(teacher: Teacher): string {
        return teacher.firstName + ' ' + teacher.lastName + 'id[' + teacher.id + ']';
      }
}
