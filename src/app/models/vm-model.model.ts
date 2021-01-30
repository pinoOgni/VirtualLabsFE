/**
 * This class represents the model of a VM (it's like a docker configuration)
 * It is defined by the teacher
 * It is used by students to create VM instances
 */

export class VmModel {
    id: number;
    name: string;
    courseId: number;
    vcpus: number;
    diskSpace: number;
    ramSize: number;

    constructor(
        id: number,
        name: string,
        courseId: number,
        vcpus: number,
        diskSpace: number,
        ramSize: number
    ) {
        this.id = id;
        this.name = name;
        this.courseId = courseId;
        this.vcpus = vcpus;
        this.diskSpace = diskSpace;
        this.ramSize = ramSize;
    }

    static toString(model: VmModel): string {
        return model.name + ' ' + model.id + '.';
    }
}
