// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';

const BASE_URL_API = '/API/';
const BASE_URL_AUTH = '/auth'
export const environment = {
  production: false,
  // base_URL: 'http://localhost:3000'
  base_URL: BASE_URL_API,
  register_url: `${BASE_URL_AUTH}/register`,
  login_url: `${BASE_URL_AUTH}/login`,
  base_url_teams: `${BASE_URL_API}teams`,
  base_url_course: `${BASE_URL_API}courses`,
  base_url_students: `${BASE_URL_API}students`,
  base_url_teachers: `${BASE_URL_API}teachers`,
  http_options: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  } 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
