/**
 * This class represents a model for the User
 */
export class User {
    id: string;
    token_id: string;
    role: string;
  
    constructor(
      id: string = null,
      token_id: string = null,
      role: string = null,
    ) {
      this.id = id;
      this.token_id = token_id;
      this.role = role;
    }
  
    /**
     * This method is used to return the expire date from a given token_id
     */
    static getToken_idExpireTime(token_id: string): number {
      return JSON.parse(atob(token_id.split('.')[1])).exp;
    }
  }
  