import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Prefija environment.baseUrl a toda URL relativa.
 * Ej: GET '/clientes' -> '/api/v1/clientes' (en dev el proxy redirige a 8080).
 * Si la URL ya es absoluta (http/https), no la toca.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAbsolute = /^https?:\/\//i.test(req.url);
    const url = isAbsolute
      ? req.url
      : `${environment.baseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`;

    return next.handle(req.clone({ url }));
  }
}
