import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,  HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from "rxjs";
import { AuthProvider } from '../auth/auth';


@Injectable()
export class InterceptorsAuthProvider implements HttpInterceptor {

  private authService: AuthProvider;
  constructor(private injector:Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthProvider);
    const token = window.localStorage.length > 0 ? window.localStorage.getItem('token') : '';
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(req);

  }

}
