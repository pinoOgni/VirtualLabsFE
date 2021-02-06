import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {VmModel} from '../models/vm-model.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VmModelsService {
  base_URL = environment.base_URL;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
  }

  query(): Observable<VmModel[]> {
    return this.http.get<VmModel[]>(this.base_URL + 'vmModels')
        .pipe(
            catchError(this.handleError<VmModel[]>('query', []))
        );
  }

  getVmModelByCourseId(courseId: number): Observable<VmModel> {
    const url = `${this.base_URL}/vmModels/`;
    // ale
    // const headers = new HttpHeaders({courseId: number(courseId)});
    /*// const header: HttpHeaders = new HttpHeaders({courseId: number(courseId)});
     console.log(headers.get('courseId'));
     return this.http.get<VmModel>(url, {headers})
         .pipe(
             catchError(this.handleError<VmModel>('query'))
         );*/
    return of(new VmModel(1, 'vmModel', 1, 3, 500, 500));
  }

  update(updatedVmModel: VmModel): Observable<VmModel> {

    return of(updatedVmModel);
  }

  addVmModel(newVmModel: VmModel): Observable<VmModel> {
    return of(newVmModel);
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
