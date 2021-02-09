import { HomeworkStatus } from "./homework.model";

export class HomeworkInfoStudent {
    assignment_id: number;
    student_id: string;
    studentFirstName: string;
    studentLastName: string;
    currentStatus: HomeworkStatus;
    currentStatusToString: string;
    score: number;

    constructor(assignment_id: number, student_id: string, studentFirstName: string, studentLastName: string,
        currentStatus: HomeworkStatus, currentStatusToString: string, score : number) {
            this.assignment_id = assignment_id;
            this.student_id = student_id;
            this.studentFirstName = studentFirstName;
            this.studentLastName = studentLastName;
            this.currentStatus = currentStatus;
            this.currentStatusToString = currentStatusToString;
            this.score = score;
        }


    static compareHomeworkInfoStudent(a: HomeworkInfoStudent, b: HomeworkInfoStudent) {
        return a.currentStatus.localeCompare(b.currentStatus);
    }
}







