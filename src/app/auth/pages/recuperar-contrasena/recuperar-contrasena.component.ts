import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  miFormulario: UntypedFormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  });
  constructor(private fb: UntypedFormBuilder,private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  validacion(){
    console.log(this.miFormulario.value);
    const {correo} = this.miFormulario.value;
    localStorage.setItem('correo',correo);
    this.router.navigateByUrl('/auth/registro');
    
  }

}
