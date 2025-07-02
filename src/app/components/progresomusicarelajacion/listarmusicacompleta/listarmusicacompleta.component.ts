import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { ProgresoMusicaService } from '../../../services/progreso-musica.service';
import { ProgresomusicaS } from '../../../models/progresoMusica';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarmusicacompleta',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './listarmusicacompleta.component.html',
  styleUrl: './listarmusicacompleta.component.css'
})
export class ListarmusicacompletaComponent implements OnInit{
    displayedColumns:string[]=['c1','c2','c3','c4','c5'];
    dataSource:MatTableDataSource<ProgresomusicaS>=new MatTableDataSource()
    form:FormGroup;
    notResults:boolean=false
    idsesionBusqueda:number=0

    constructor(private promurelaxserv:ProgresoMusicaService, private fb:FormBuilder){
      this.form=fb.group({
        idsesion:['']
      })
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    ngOnInit(): void {
        this.promurelaxserv.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
        
        this.form.get('idsesion')?.valueChanges.subscribe(value=>{
        this.idsesionBusqueda=value
        this.buscar()
      })
  
    }

    buscar(){
      if(this.idsesionBusqueda!=0){
          this.promurelaxserv.listMusicacompleta(this.idsesionBusqueda).subscribe(data=>{
             this.dataSource=new MatTableDataSource(data)
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
             this.notResults=data.length===0
          })
          
      }else{
        this.promurelaxserv.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.notResults=false
        })
      }
    }
}
