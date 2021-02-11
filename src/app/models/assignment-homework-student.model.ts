import { HomeworkStatus } from './homework.model';

export class AssignmentHomeworkStudent {

    assignment_id: number;
    name: string;
    releaseDate: string;
    expiryDate: string;
    currentStatus: HomeworkStatus;
    score: number;

 constructor() {

 }
}
