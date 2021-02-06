
/**
 * This class represents the model for a Course
 */
export class Course {
    id: number;
    acronym: string; //apa
    name: string; //algoritmi-e-prgrammazione
    min: number;
    max: number;
    enabled: boolean;
    vcpu: number;
    disk: number;
    memory: number;
    maxVmIstance: number;
    maxRunningVmInstance: number;

    constructor(
        id: number,
        acronym: string,
        name: string,
        min: number,
        max: number,
        enabled: boolean,
        vcpu: number,
        disk: number,
        memory: number,
        maxVmIstance: number = 0,
        maxRunningVmInstance: number = 0
    ) {
        this.id = id;
        this.acronym = acronym;
        this.name = name;
        this.min = min;
        this.max= max;
        this.enabled = enabled;
        this.vcpu = vcpu;
        this.disk = disk;
        this.memory = memory;
        this.maxVmIstance = maxVmIstance;
        this.maxRunningVmInstance = maxRunningVmInstance;
    }
}
