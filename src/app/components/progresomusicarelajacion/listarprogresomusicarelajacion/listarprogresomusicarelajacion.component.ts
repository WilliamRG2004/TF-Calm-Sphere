import { Component, OnInit, inject, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { ProgresoMusicaService } from '../../../services/progreso-musica.service';
import { ProgresomusicaS } from '../../../models/progresoMusica';

@Component({
  selector: 'app-listarprogresomusicarelajacion',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listarprogresomusicarelajacion.component.html',
  styleUrl: './listarprogresomusicarelajacion.component.css'
})
export class ListarprogresomusicarelajacionComponent implements OnInit{
    displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7'];
    dataSource:MatTableDataSource<ProgresomusicaS>=new MatTableDataSource()
    constructor(private promurelaxserv:ProgresoMusicaService){}
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    dialog = inject(MatDialog)
  
    ngOnInit(): void {
        this.promurelaxserv.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
  
        this.promurelaxserv.getList().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
    }
  
    openDialog(id:number){
      const dialogRef = this.dialog.open(ConfirmComponent);
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.eliminar(id);
        }else{
          console.log("Diálogo respondió no eliminar");
        }
      });
    }
  
    eliminar(id:number){
      this.promurelaxserv.deleteMucrelax(id).subscribe(data=>{
        this.promurelaxserv.list().subscribe(data=>{
          this.promurelaxserv.setList(data)
        })
      })
    }
}
