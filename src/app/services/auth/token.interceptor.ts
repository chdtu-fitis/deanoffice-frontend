import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);

    request = request.clone({setHeaders: {Authorization: `Bearer ${this.authService.getToken()}`}});
    return next
      .handle(request)
      .do(() => {})
      .catch((response: any) => {
        if (response instanceof HttpErrorResponse) {
          const status = +response.status;
          if (status === 401 || status === 403) {
            this.authService.logout();
          }
        }
        return Observable.throw(response);
      });
  }

}
