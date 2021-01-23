import {Role} from './role.model'

/**
 * This class represents a model for the User
 */
export class User {
    email: string;
    token_id: string;
    roles: string[];
  
    constructor(
      email: string,
      token_id: string = null,
      roles: string[] = null
    ) {
      this.email = email;
      this.token_id = token_id;
      this.roles = roles;
    }
  
    /**
     * This method is used to return the expire date from a given token_id
     */
    static getToken_idExpireTime(accessToken: string): number {
      return JSON.parse(atob(accessToken.split('.')[1])).exp;
    }

  }
  