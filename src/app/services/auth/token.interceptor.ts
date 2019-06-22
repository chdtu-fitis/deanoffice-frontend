import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);
    if (request.url.includes(environment.apiUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(request).do((ev) => {
    }).catch((response: any) => {
      if (response instanceof HttpErrorResponse) {
        if (response.status == 401 || response.status == 403) {
          this.authService.logout()
        }
      }
      return Observable.throw(response);
    });
  }

}
