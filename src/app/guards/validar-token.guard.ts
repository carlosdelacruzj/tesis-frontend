import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard  {


  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(): Observable<boolean> | boolean {
    console.log('CanActivate');

    return this.authService.verificaAuteticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth']);
            console.log('se activo esta huevada can activate');
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('CanLoad');

    return this.authService.verificaAuteticacion()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth']);
          console.log('se activo esta huevada');
          
        }
      })
    );
  }
}
