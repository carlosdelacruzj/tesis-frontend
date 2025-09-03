import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCContrasenaComponent } from './nueva-ccontrasena.component';

describe('NuevaCContrasenaComponent', () => {
  let component: NuevaCContrasenaComponent;
  let fixture: ComponentFixture<NuevaCContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
