import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-principal',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent implements DoCheck{
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.loginService.verificar();
  }
}
