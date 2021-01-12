/**
 * This class represents the model of a VM (it's like a docker configuration)
 * It is defined by the teacher
 * It is used by students to create VM instances 
 */

export class VmModel {
    id: number;
    name: string;
    courseId: string;

    constructor(id: number = 0, name: string = " ", courseId: string) {
        this.id = id;
        this.name = name;
        this.courseId = courseId;
    }

    static toString(model: VmModel): string {
        return model.name + " " + model.id + "."
    }
}
