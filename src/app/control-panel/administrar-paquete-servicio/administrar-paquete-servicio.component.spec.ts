import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPaqueteServicioComponent } from './administrar-paquete-servicio.component';

describe('AdministrarPaqueteServicioComponent', () => {
  let component: AdministrarPaqueteServicioComponent;
  let fixture: ComponentFixture<AdministrarPaqueteServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarPaqueteServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPaqueteServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
