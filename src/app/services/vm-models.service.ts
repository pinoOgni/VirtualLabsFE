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
  coursesUrl = environment.base_url_course;
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
    return this.http.get<VmModel>(url)
        .pipe(
            catchError(this.handleError<VmModel>('getVmModel'))
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


  addVmModel(courseId: number, vmModel: VmModel): Observable<VmModel> {
    const url = `${this.coursesUrl}/${courseId}/vmModel`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<VmModel>(url, vmModel, httpOptions).pipe(
        catchError(this.handleError<VmModel>('updateVmModel'))
    );
  }
}
