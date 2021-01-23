/**
 * This class represents the model for a Course
 */
export class Course {
    id: number;
    acronym: string; //apa
    fullName: string; //algoritmi-e-prgrammazione
    minStudentsForTeam: string;
    maxStudentsForTeam: string;
   // heldBy: number[];
    enabled: boolean;

    constructor(id: number, acronym: string, name: string, minStudentsForTeam: string, maxStudentsForTeam: string,  enabled: boolean
    ) {
        this.id = id;
        this.acronym = acronym;
        this.fullName = name;
        this.minStudentsForTeam = minStudentsForTeam;
        this.maxStudentsForTeam = maxStudentsForTeam;
        this.enabled = enabled;
    }
}
