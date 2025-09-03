import { ConstantPool } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaqueteServicioService } from 'src/app/control-panel/administrar-paquete-servicio/service/paquete-servicio.service';
import { EventoServicioService } from 'src/app/control-panel/administrar-paquete-servicio/service/evento-servicio.service';
import { EventoAllServiciosService } from 'src/app/control-panel/administrar-paquete-servicio/service/detalle-servicios.service';
import { DetalleServiciosComponent } from './components/detalle-servicios/detalle-servicios.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-administrar-paquete-servicio',
  templateUrl: './administrar-paquete-servicio.component.html',
  styleUrls: ['./administrar-paquete-servicio.component.css']
})
export class AdministrarPaqueteServicioComponent implements OnInit {

  base: boolean = true;
  servicioId: number = 0;
  servicioNombre: string='';
  paquete: any[] = [];
  servicio: any[] = [];
  serviciosf: any[] = [];
  tempDialog: boolean = false;

  columnsToDisplay = ['ID','nombre','enlace']
  constructor(private service: PaqueteServicioService,private service2: EventoServicioService, public dialog: MatDialog, private allserivicios: EventoAllServiciosService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPaquete();
    this.getServicio();
    this.getAllService();
  }

  getPaquete() {
    this.service.getAllNombres().subscribe((response) => {
      this.paquete = response;
    });
  }

  getServicio() {
    this.service2.getAllNombres2().subscribe((response) => {
      this.servicio = response;
    });
  }

  openDialog() {
    const dialogPaq = this.dialog.open(DetalleServiciosComponent,{data:this.servicioId});
    dialogPaq.afterClosed().subscribe(resp =>{
      this.tempDialog = true;
      this.cdRef.detectChanges();
      // setTimeout(() => {
      //   this.tempDialog = false;
      // }, 3000);
    })
    
  }

  getAllService() {
    this.allserivicios.getAllServicios().subscribe((response) => {
      this.serviciosf = response;
    });
  }


  prueba(event: number){  
    this.base = false; this.servicioId = event;
    this.servicioNombre= event.toString();
  }

  

}
