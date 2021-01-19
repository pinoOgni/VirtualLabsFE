// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';

const BASE_URL_API = '/api';

export const environment = {
  production: false,
  // base_URL: 'http://localhost:3000'
  base_URL: BASE_URL_API,
  register_url: `${BASE_URL_API}/register`,
  login_url: `${BASE_URL_API}/login`,
  base_http_headers: {
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
