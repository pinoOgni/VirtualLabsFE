import { StudentModel } from "./student.model";
/**
 * This class represents a model for the Team
 */
export class Team {
    name: string;
    id: number;
    members: StudentModel[];
    courseId: number;
    maxVCpu: number;
    maxDiskSpace: number;
    maxRam: number;
    maxRunningInstances: number;
    maxTotalInstances: number;
    isActive: boolean;

    constructor(
        name: string,
        id: number,
        members: StudentModel[],
        courseId: number,
        maxVCpu: number,
        maxDiskSpace: number,
        maxRam: number,
        maxRunningInstances: number,
        maxTotalInstances: number,
        isActive: boolean,
    ) {
        this.name = name;
        this.id = id;
        this.members = members;
        this.courseId = courseId;
        this.maxVCpu = maxVCpu;
        this.maxDiskSpace = maxDiskSpace;
        this.maxRam = maxRam;
        this.maxRunningInstances = maxRunningInstances;
        this.maxTotalInstances = maxTotalInstances;
        this.isActive = isActive;
    }
}
