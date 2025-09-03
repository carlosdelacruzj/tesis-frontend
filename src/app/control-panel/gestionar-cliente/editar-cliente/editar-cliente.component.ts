import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/cliente.model';
import { DateAdapter } from '@angular/material/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  nombrePattern = "^[a-zA-Z ]{2,20}$"; 
  apellidoPattern = "^[a-zA-Z ]{2,30}$"; 
  docPattern = "^[0-9]{1}[0-9]{7}$"; 
  celularPattern = "^[1-9]{1}[0-9]{6,8}$"; 
  correoPattern = "^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$"; 

  constructor(public service: ClienteService) { }

  ngOnInit(): void {
  }
  public editCliente(clienteForm: NgForm) {
    console.log(clienteForm.value);
    let data = {
      correo: clienteForm.value.correo,
      celular: clienteForm.value.celular,
      idCliente: clienteForm.value.ID
    };
    console.log(data);
    try {
      this.service.putClienteById(data).subscribe();
      swal.fire({
        text: 'Actualización exitosa',
        icon: 'success',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  clear(ClienteForm: NgForm){
    ClienteForm.reset();
 }
}
