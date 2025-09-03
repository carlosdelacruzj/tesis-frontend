import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPerfilesComponent } from './gestionar-perfiles.component';

describe('GestionarPerfilesComponent', () => {
  let component: GestionarPerfilesComponent;
  let fixture: ComponentFixture<GestionarPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
