/**
 * teamName is the name of the team
 * creator is who create this proposal
 * membersWithstate is used to display firstName, lastName and yes/no of the members of the proposal
 * where yes/no it means if that student has accepted the proposal or not
 * isValid is used to beacuse if a student reject the proposal, it becomes automatically isValid = false
 * and nobody can accept it anymore
 */

export enum ResponseTypeInvitation {
    NOT_REPLY = 'NOT_REPLY',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED' ,
}

export interface StudentStatusInvitation {
    studentId: string;
    accepted: ResponseTypeInvitation;
}

export class Proposal {
    id: number;
    teamName: string;
    deadline: string;
    token: string;
    studentsInvitedWithStatus: StudentStatusInvitation[];


    constructor(id: number = -1, teamName: string = '', studentsInvitedWithStatus: StudentStatusInvitation[], deadline: string, token: string='') {
        this.id = id;
        this.teamName = teamName;
        this.studentsInvitedWithStatus = studentsInvitedWithStatus;
        this.deadline = deadline;
        this.token = token;

    }
}
