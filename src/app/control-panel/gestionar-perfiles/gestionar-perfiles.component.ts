import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Perfil } from './model/perfil.model';
import { PerfilService } from './service/perfil.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-gestionar-perfiles',
  templateUrl: './gestionar-perfiles.component.html',
  styleUrls: ['./gestionar-perfiles.component.css']
})
export class GestionarPerfilesComponent implements OnInit {


  perfiles: Perfil[]

  displayedColumns2 = [
    'ID',
    'ROL',
    'nombre',
    'apellido',
    'correo',
    'celular',
    'doc',
    'direccion',
    'actions',
  ];
  id2 =0;
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    public service: PerfilService,
  ) {}
  fechaActual = '';
  async ngOnInit(){
    await this.getAllPerfiles();
  }
 

  async getAllPerfiles(){
    var data = await this.service.getAllPerfiles();
    this.dataSource2 = new MatTableDataSource(data);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.matSort;
  }
  // para hacer los filtros
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
  filterData2($event: any) {
    this.dataSource2.filter = $event.target.value;
  }
  //DESDE AQUI BORRAS
  closeResult = '';

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public getByIdPerfil(id : number){
    this.service.getByIdPerfil(id).subscribe((responde) => {
      this.service.selectPerfil = responde[0];
      console.log(this.service.selectPerfil);
    });
  }

}
