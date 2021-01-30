export class HomeworkVersion {
    id: number;
    content: string; //base64 della soluzione del compito
    timestamp: string;

    constructor(id: number,  content: string = "aG9tZXdvcmsx=", timestamp: string) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
    }
}
