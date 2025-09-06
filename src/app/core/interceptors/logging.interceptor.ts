import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = performance.now();
    const id = Math.random().toString(36).slice(2, 8);

    // Evita loguear assets
    if (req.url.includes('.css') || req.url.includes('.js')) {
      return next.handle(req);
    }

    // Log de salida
    console.log(
      `%c[HTTP ${id}] ➜ ${req.method} ${req.urlWithParams}`,
      'color:#6a5acd;font-weight:bold'
    );

    return next.handle(req).pipe(
      tap({
        next: (evt) => {
          if (evt instanceof HttpResponse) {
            const ms = (performance.now() - started).toFixed(1);
            console.log(
              `%c[HTTP ${id}] ✓ ${evt.status} ${req.method} ${req.url} (${ms} ms)`,
              'color:#2e8b57;font-weight:bold'
            );
          }
        },
        error: (err: HttpErrorResponse) => {
          const ms = (performance.now() - started).toFixed(1);
          console.error(
            `%c[HTTP ${id}] ✗ ${err.status} ${req.method} ${req.url} (${ms} ms)`,
            'color:#b22222;font-weight:bold',
            '\nBody:', err.error
          );
        }
      })
    );
  }
}
