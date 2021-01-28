/**
 * This class represents a proposal of a team from a student
 * An instance of this class is used to create a team (in student-no-team-component)
 */

export class ProposalOfTeam {
    teamName: string;
    deadline: string;
    selectedStudentIds: string[];

    constructor(teamName: string='',deadline: string , selectedStudentIds: string[] = [] ) {
        this.teamName = teamName;
        this.selectedStudentIds = selectedStudentIds;
        this.deadline = deadline;
    }
}
