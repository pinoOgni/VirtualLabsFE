import { HomeworkStatus } from "./homework.model";

export class HomeworkVersion {
    id: number;
    content: string; //base64 della soluzione del compito
    timestamp: string;
    versionStatus: HomeworkStatus;
    

    constructor(id: number,  content: string = "aG9tZXdvcmsx=", timestamp: string, versionStatus: number = 0) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.versionStatus = HomeworkStatus[HomeworkStatus[versionStatus]];
    }


    static compareHomeworkVersion(a: HomeworkVersion, b: HomeworkVersion) {
        return a.timestamp.localeCompare(b.timestamp);
    }
}
