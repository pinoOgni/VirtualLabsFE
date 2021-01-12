export class StudentModel {
  serial: string;
  firstName: string;
  name: string;
  groupId: number;
  courseId: number;
  id: number;
  groupName?: string;

  constructor(element: {id: number, serial: string, firstName: string, name: string, groupId?: number, group?: { id: number, name: string}, courseId: number}) {
    this.serial = element.serial;
    this.firstName = element.firstName;
    this.name = element.name;

    this.courseId = element.courseId;
    this.id = element.id;

    this.groupId = element.groupId;
    if(element.group == null ) {
      this.groupName = '<>';
    } else {
      this.groupName = element.group.name;
    }
  }

  static toString(s: StudentModel): string {
    return s.firstName + ' ' + s.name + ' ' + s.serial;
  }
}

