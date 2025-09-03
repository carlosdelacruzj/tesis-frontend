import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEstadisticosComponent } from './reportes-estadisticos.component';

describe('ReportesEstadisticosComponent', () => {
  let component: ReportesEstadisticosComponent;
  let fixture: ComponentFixture<ReportesEstadisticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEstadisticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesEstadisticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
