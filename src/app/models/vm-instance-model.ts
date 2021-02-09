export class VmInstanceModel {
    id: number;

    name: string;

    vcpu: number;

    disk: number;


    memory: number;

    status: string;

    constructor(id: number, name: string, vcpu: number, disk: number, memory: number, status: string) {
        this.id = id;
        this.name = name;
        this.vcpu = vcpu;
        this.disk = disk;
        this.memory = memory;
        this.status = status;
    }
}
