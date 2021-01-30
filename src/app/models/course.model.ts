/**
 * This class represents the model for a Course
 */
export class Course {
    acronym: string; //apa
    fullName: string; //algoritmi-e-prgrammazione
    minStudentsForTeam: number;
    maxStudentsForTeam: number;
    enabled: boolean;

    constructor(acronym: string, name: string, minStudentsForTeam: number, maxStudentsForTeam: number,  enabled: boolean
    ) {
        this.acronym = acronym;
        this.fullName = name;
        this.minStudentsForTeam = minStudentsForTeam;
        this.maxStudentsForTeam = maxStudentsForTeam;
        this.enabled = enabled;
    }
}
