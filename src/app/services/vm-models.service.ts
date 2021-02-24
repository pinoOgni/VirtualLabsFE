import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { VmModel } from '../models/vm-model.model';
import { environment } from '../../environments/environment';
import { ErrorService } from '../helpers/error.service';

@Injectable({
  providedIn: 'root'
})
export class VmModelsService {
  base_URL = environment.base_URL;
  coursesUrl = environment.base_url_course;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private errorService: ErrorService, private http: HttpClient) {
  }

  /**
   * This method is used to forward a "create virtual machine model" 
   * request to the server
   * @param courseId 
   * @param vmModel 
   */
  addVmModel(courseId: number, vmModel: VmModel): Observable<VmModel> {
    const url = `${this.coursesUrl}/${courseId}/vmModel`;
    return this.http.post<VmModel>(url, vmModel, environment.http_options).pipe(
      catchError((err, caught) => this.errorService.handleError<any>(err, caught))
    );
  }
}
