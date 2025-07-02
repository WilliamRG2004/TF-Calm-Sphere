import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MusicaCategoria } from '../../../models/musicaCategoria';
import { MusicaCategoriaService } from '../../../services/musica-categoria.service';

@Component({
  selector: 'app-listarmusicacategoria',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listarmusicacategoria.component.html',
  styleUrl: './listarmusicacategoria.component.css'
})
export class ListarmusicacategoriaComponent implements OnInit{
  displayedColumns:String[]=['c1','c2','c3','c4'];
  dataSource:MatTableDataSource<MusicaCategoria>=new MatTableDataSource()
  constructor(
    private mucservice:MusicaCategoriaService,
  ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.mucservice.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.mucservice.getList().subscribe(data=>{
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
    this.mucservice.deleteMuc(id).subscribe(data=>{
      this.mucservice.list().subscribe(data=>{
        this.mucservice.setList(data)
      })
    })
  }
}
