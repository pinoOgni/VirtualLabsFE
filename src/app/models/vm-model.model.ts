/**
 * This class represents the model of a VM (it's like a docker configuration)
 * It is defined by the teacher
 * It is used by students to create VM instances
 */

export class VmModel {
    id: number;
    name: string;
    configuration: string;

    constructor(
        name: string,
        configuration: string
    ) {
        this.name = name;
        this.configuration = configuration;
    }

    static toString(model: VmModel): string {
        return model.name + ' ' + model.id + '.';
    }
}
