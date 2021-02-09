import {TeamStatus} from './team-status';

/**
 * This class represents a model for the Team
 */
export class Team {
    name: string;
    id: number;
    vcpuMAX: number;
    diskMAX: number;
    memoryMAX: number;
    runningVmInstance: number;
    maxVmInstance: number;
    status: TeamStatus;


    constructor(
        name: string,
        id: number,
        courseId: number,
        maxVCpu: number,
        maxDiskSpace: number,
        maxRam: number,
        maxRunningInstances: number,
        maxTotalInstances: number,
        isActive: TeamStatus,
    ) {
        this.name = name;
        this.id = id;
        this.vcpuMAX = maxVCpu;
        this.diskMAX = maxDiskSpace;
        this.memoryMAX = maxRam;
        this.runningVmInstance = maxRunningInstances;
        this.maxVmInstance = maxTotalInstances;
        this.status = isActive;
    }
}
