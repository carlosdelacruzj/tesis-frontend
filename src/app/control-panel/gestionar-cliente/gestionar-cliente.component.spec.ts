import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarClienteComponent } from './gestionar-cliente.component';

describe('GestionarClienteComponent', () => {
  let component: GestionarClienteComponent;
  let fixture: ComponentFixture<GestionarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
