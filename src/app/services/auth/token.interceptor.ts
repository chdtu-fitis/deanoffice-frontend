import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request).pipe(
      tap((ev) => {}),
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status == 401 || response.status == 403) {
            this.authService.logout()
          }
        }
        return observableThrowError(response);
      })
    );
  }
}
