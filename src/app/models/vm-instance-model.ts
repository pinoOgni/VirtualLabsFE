export enum VmInstanceStatus {
    SUSPENDED = 'SUSPENDED',
    RUNNING = 'RUNNING',
    ERROR = 'ERROR'
}

export class VmInstanceModel {
    id: number;

    name: string;

    vcpu: number;

    disk: number;


    memory: number;

    status: VmInstanceStatus;


    constructor(name: string, vcpu: number, disk: number, memory: number) {
        //   this.id = id;
        this.name = name;
        this.vcpu = vcpu;
        this.disk = disk;
        this.memory = memory;
        //    this.status = status;
    }
}
