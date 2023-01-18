import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/adm/login') || request.url.includes('/adm/create')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('ADM_TOKEN');

    if (!token) {
      this.router.navigate(['/adm/login']);
    }

    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(modifiedRequest);
  }
}
