
export class Teacher {
    id: string;
    email: string;
    name: string;
    surname: string;
  
    constructor(
      id: string = '',
      email: string = '',
      name: string = '',
      surname: string = '',
    ) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.surname = surname;
    }
  
    /**
     * Static method to return a user-friendly string representation of the student
     *
     * @param student the student to be print
     */
    static displayFn(student: Teacher): string {
      return student.surname + ' ' + student.name + ' (' + student.id + ')';
    }
  }