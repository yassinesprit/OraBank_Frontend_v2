import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "./Services/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    console.log(token)
    if (!helper.isTokenExpired(token)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Redirect to your error component or handle as needed
          this.router.navigate(['/error']); // Example route
        }
        return throwError(error);
      })
    );  }
}
