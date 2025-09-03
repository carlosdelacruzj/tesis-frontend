import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-ccontrasena',
  templateUrl: './nueva-ccontrasena.component.html',
  styleUrls: ['./nueva-ccontrasena.component.css']
})
export class NuevaCContrasenaComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder) { }
  miFormulario: UntypedFormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  });
  ngOnInit(): void {
  }
  validacion(){
    
  }

}
