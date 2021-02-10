import {HomeworkStatus} from './homework.model';

export class HomeworkInfoStudent {

    private _assignment_id: number;

    get assignment_id(): number {
        return this._assignment_id;
    }

    set assignment_id(value: number) {
        this._assignment_id = value;
    }

    private _student_id: string;

    get student_id(): string {
        return this._student_id;
    }

    set student_id(value: string) {
        this._student_id = value;
    }

    constructor() {

    }

    private _studentFirstName: string;

    get studentFirstName(): string {
        return this._studentFirstName;
    }

    set studentFirstName(value: string) {
        this._studentFirstName = value;
    }

    private _studentLastName: string;

    get studentLastName(): string {
        return this._studentLastName;
    }

    set studentLastName(value: string) {
        this._studentLastName = value;
    }

    private _currentStatus: HomeworkStatus;

    get currentStatus(): HomeworkStatus {
        return this._currentStatus;
    }

    set currentStatus(value: HomeworkStatus) {
        this._currentStatus = value;
    }

/**
  private _currentStatusToString: string;

    get currentStatusToString(): string {
        return this._currentStatusToString;
    }
 */

    private _score: number;

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    static compareHomeworkInfoStudent(a: HomeworkInfoStudent, b: HomeworkInfoStudent) {
        return a._currentStatus.localeCompare(b._currentStatus);
    }
}







