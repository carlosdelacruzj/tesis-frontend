import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPedidoComponent } from './actualizar-pedido.component';

describe('ActualizarPedidoComponent', () => {
  let component: ActualizarPedidoComponent;
  let fixture: ComponentFixture<ActualizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
