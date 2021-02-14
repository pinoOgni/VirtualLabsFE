import { StudentStatusInvitation } from "./proposal.model";

export class ProposalInfo {
    teamName: string;
    creator: string;
    membersWithStatus: StudentStatusInvitation[];
    deadline: string;
    token: string;
    id: number;

    constructor() {

    }
}
