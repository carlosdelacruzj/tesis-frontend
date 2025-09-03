import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAlquiladoComponent } from './detalles-alquilado.component';

describe('DetallesAlquiladoComponent', () => {
  let component: DetallesAlquiladoComponent;
  let fixture: ComponentFixture<DetallesAlquiladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAlquiladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAlquiladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
