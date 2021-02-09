import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Vm} from '../models/vm.model';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  base_URL = environment.base_URL;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
  }

  getVmByTeamId(): Observable<Vm[]> {
    return this.http.get<Vm[]>(this.base_URL + 'vmModels')
        .pipe(
            catchError(this.handleError<Vm[]>('query', []))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
