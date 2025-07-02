import { Component, OnInit } from '@angular/core';
import { ProgresoMusicaService } from '../../../services/progreso-musica.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-porcentajeprogreso',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './porcentajeprogreso.component.html',
  styleUrl: './porcentajeprogreso.component.css'
})
export class PorcentajeprogresoComponent implements OnInit{

    form:FormGroup;
    notResults:boolean=false
    idsesionBusqueda:number=0
    porcentaje: number = 0;

    constructor(private promurelaxserv:ProgresoMusicaService, private fb:FormBuilder){
      this.form=fb.group({
        idsesion:['']
      })
    }
  
    ngOnInit(): void {   
        this.form.get('idsesion')?.valueChanges.subscribe(value=>{
        this.idsesionBusqueda=value
        this.buscar()
      })
  
    }

buscar() {
  if (this.idsesionBusqueda != 0) {
    this.promurelaxserv.listprogresoid(this.idsesionBusqueda).subscribe(data => {
      this.porcentaje = data.porcentaje;
    });
  } else {
    this.porcentaje = 0; // cuando está vacío
  }
}

}
