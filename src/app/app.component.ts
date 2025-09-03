import { Component, OnInit } from '@angular/core';
import { Router, Routes, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  // mantenemos el inline template para evitar el "1"
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // A) dump de TODA la config de rutas (incluye children y guards)
    const dump = (routes: Routes, prefix = '') => {
      routes.forEach(r => {
        // NO tipar como Route; usamos un POJO de resumen
        const info = {
          path: r.path,
          redirectTo: r.redirectTo,
          pathMatch: r.pathMatch as string | undefined,
          component: (r as any).component?.name as string | undefined, // solo nombre para log
          hasLoadChildren: !!r.loadChildren,                            // <— aquí el cambio clave
          canActivate: (r.canActivate || []).map(g => (g as any).name),
          canLoad: (r.canLoad || []).map(g => (g as any).name),
          canActivateChild: (r.canActivateChild || []).map(g => (g as any).name),
          resolveKeys: r.resolve ? Object.keys(r.resolve) : [],
        };
        console.log(prefix + '🧭 Route ->', info);
        if (r.children) dump(r.children, prefix + '  ');
      });
    };
    console.log('==== ROUTER CONFIG ====');
    dump(this.router.config);

    // B) trazado resumido de lazy-loads y guards en runtime
    this.router.events.subscribe(e => {
      if (e instanceof RouteConfigLoadStart)  console.log('⏳ Lazy loading start:', e.route?.path);
      if (e instanceof RouteConfigLoadEnd)    console.log('✅ Lazy loading end:', e.route?.path);
      if (e instanceof GuardsCheckStart)      console.log('🛡️ GuardsCheckStart:', e.url);
      if (e instanceof GuardsCheckEnd)        console.log('🛡️ GuardsCheckEnd:', e.url, '=>', e.shouldActivate ? 'ALLOW' : 'BLOCK');
    });

    this.router.events.pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe(() => {
        let node = this.router.routerState.root;
        while (node.firstChild) node = node.firstChild;
        console.log(
          '➡️ Ruta activada:',
          node.snapshot.routeConfig?.path || '(vacía)',
          'params:', node.snapshot.params,
          'data:', node.snapshot.data
        );
      });
  }
}
