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
    enabled: string;

    constructor(id: number, acronym: string, name: string, minStudentsForTeam: string, maxStudentsForTeam: string, enabled: string
    ) {
        this.id = id;
        this.acronym = acronym;
        this.fullName = name;
        this.minStudentsForTeam = minStudentsForTeam;
        this.maxStudentsForTeam = maxStudentsForTeam;
        this.enabled = enabled;
    }
}
