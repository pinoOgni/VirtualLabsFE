/**
 * This class represents the model for a Course
 */
export class Course {
    id: number;
    acronym: string; //apa
    fullName: string; //algoritmi-e-prgrammazione
    minStudentsForTeam: number;
    maxStudentsForTeam: number;
    enabled: boolean;
    vcpus: number;
    diskSpace: number;
    ramSize: number;

    constructor(
        id: number,
        acronym: string,
        name: string,
        minStudentsForTeam: number,
        maxStudentsForTeam: number,
        enabled: boolean,
        vcpus: number,
        diskSpace: number,
        ramSize: number
    ) {
        this.id = id;
        this.acronym = acronym;
        this.fullName = name;
        this.minStudentsForTeam = minStudentsForTeam;
        this.maxStudentsForTeam = maxStudentsForTeam;
        this.enabled = enabled;
        this.vcpus = vcpus;
        this.diskSpace = diskSpace;
        this.ramSize = ramSize;
    }
}
