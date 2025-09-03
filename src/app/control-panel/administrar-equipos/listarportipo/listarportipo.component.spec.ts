import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarportipoComponent } from './listarportipo.component';

describe('ListarportipoComponent', () => {
  let component: ListarportipoComponent;
  let fixture: ComponentFixture<ListarportipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarportipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarportipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
