/**
 * This class represents a proposal of a team from a student
 * An instance of this class is used to create a team (in student-no-team-component)
 * In the server there is the RequestTeamDTO
 */

export class ProposalOfTeam {
    teamName: string;
    deadline: string;
    selectedStudentsId: string[]; //english from our best colleague Hamza

    constructor(teamName: string='',deadline: string , selectedStudentsId: string[] = []) {
        this.teamName = teamName;
        this.selectedStudentsId = selectedStudentsId;
        this.deadline = deadline;
    }
}
