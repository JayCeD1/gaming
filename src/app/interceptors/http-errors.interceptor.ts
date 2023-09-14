import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor{

  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => `An error occurred - Error code: ${error.status}.`);
  }

}
