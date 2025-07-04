import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
   imports: [MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}
  login() {
    
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['menuCalmSphere']);
      },
      (error) => {
        this.mensaje = '❌ Por favor completa todos los campos obligatorios';
        this.snackBar.open(this.mensaje, 'Cerrar', { duration: 2000 });
      }
    );
  }
  cancelar() {
    this.router.navigate(['menuCalmSphere']);
  }
}
