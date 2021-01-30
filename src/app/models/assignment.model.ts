/**
 * This class represents an assignment
 */
export class Assignment {
    id: number;
    name: string;
    content: string; //base64 del contenuto dell'elaborato
    releaseDate: string;
    expiryDate: string;
  
    constructor(id: number = 0,releaseDate: string, expiryDate: string, content: string = "YXNzaWdubWVudDE=") {
      this.id = id;
      this.releaseDate = '';
      this.content = content;
      this.releaseDate = releaseDate;
      this.expiryDate = expiryDate;
    }
  
    static compareAssignment(a: Assignment, b: Assignment) {
      return a.expiryDate.localeCompare(b.expiryDate);
    }
  }
  
