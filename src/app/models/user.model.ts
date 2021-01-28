import {Role} from './role.model'

/**
 * This class represents a model for the User
 */
export class User {
    username: string;
    token: string;
    roles: string[];
  
    constructor(
      username: string,
      token: string = null,
      roles: string[] = null
    ) {
      this.username = username;
      this.token = token;
      this.roles = roles;
    }
  
    /**
     * This method is used to return the expire date from a given accessToken
     */
    static getAccessTokenExpireTime(accessToken: string): number {
      return JSON.parse(atob(accessToken.split('.')[1])).exp;
    }

  }
  