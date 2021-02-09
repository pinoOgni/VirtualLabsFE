import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

/**
 * 
 * @param result 
 * @param service 
 * @param show 
 * @param message 
 */
export function handleError<T>(result?: T, service: ToastrService = this.toastrService, show: boolean = true, message: string = 'There is an error') {
  return (error: any): Observable<T> => {
    if (show) {
      if (error.error instanceof Blob && error.status < 500) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const msg = JSON.parse(fileReader.result.toString()).message;
          service.error(msg, 'Error', {
            timeOut: 6000,
          });
          console.log(msg);
        };
        fileReader.readAsText(error.error);
      } else {
        const messageError = `${error.error.message ? error.error.message : message}`;
        service.error(messageError, 'Error', {
          timeOut: 6000,
        });
        console.log(messageError);
      }
    }
    return of(result as T);
  };
}
