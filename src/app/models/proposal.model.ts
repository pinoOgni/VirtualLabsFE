/**
 * teamName is the name of the team
 * creator is who create this proposal
 * membersWithstate is used to display firstName, lastName and yes/no of the members of the proposal
 * where yes/no it means if that student has accepted the proposal or not
 * isValid is used to beacuse if a student reject the proposal, it becomes automatically isValid = false
 * and nobody can accept it anymore
 */

export class Proposal {
    teamName: string;
    creator: string;
    membersWithState: string[];
    deadline: string;
    isValid: boolean;
    token: string;



    constructor(teamName: string = '', creator: string = '', membersWithState: string[], deadline: string, isValid: boolean,  token: string='') {
        this.teamName = teamName;
        this.creator = creator;
        this.membersWithState = membersWithState;
        this.deadline = deadline;
        this.isValid = isValid;
        this.token = token;

    }
}