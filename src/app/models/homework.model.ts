/**
 * This enum represents the status of the homework for a student
 * NULL = The student has not yet read the delivery
 * READ = The student has read the delivery
 * SUBMITTED = The student submitted the assignment
 * REVIEWED = the teacher revised the test
 * DEFINITELY_REVIEWED = the professor has definitely reviewed the test and should put a grade
 * SCORED = the professor gave the homework a score
 */
export enum HomeworkStatus {
    NULL = 'NULL', 
    READ = 'READ',
    SUBMITTED = 'SUBMITTED',
    REVIEWED = 'REVIEWED', 
    DEFINITELY_REVIEWED = 'DEFINITELY_REVIEWED',
    SCORED = 'SCORED'
}

/**
 * This class represent a homework of a student
 * the assignment_id + student_id can give us the homweork of a student
 * thanks to the status the teacher can filter the homeworks
 */
export class Homework {
    assignment_id: number;
    student_id: string;
    currentStatus: HomeworkStatus;
    score: number;

    constructor(assignment_id: number, student_id: string , currentStatus: number = 0, score: number = 0) {
        this.assignment_id = assignment_id;
        this.student_id = student_id;
        this.currentStatus = HomeworkStatus[HomeworkStatus[currentStatus]];
        this.score = score;
    }


static compareHomework(a: Homework, b: Homework) {
        return a.currentStatus.localeCompare(b.currentStatus);
      }

}
