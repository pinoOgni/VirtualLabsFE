
/**
 * This class represent the model for the instance of a VM, 
 * in particular it is used for the VM's resources
 * 
 */
export class Vm {
    name: string;
    id: number;
    vcpu: number;
    ram: number;
    spaceDisk: number;
    isActive: boolean;

    constructor(name: string = ' ', id: number = 0, vcpu: number = 1,
        ram: number = 1, spaceDisk: number = 1, isActive: boolean = false
    ) {
        this.name = name;
        this.id = id;
        this.vcpu = vcpu;
        this.ram = ram;
        this.spaceDisk = spaceDisk;
        this.isActive = isActive;
    }

}