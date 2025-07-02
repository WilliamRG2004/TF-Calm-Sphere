import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { TipoMaterial } from '../../../models/tipoMaterial';
import { TipoMaterialService } from '../../../services/tipo-material.service';


@Component({
  selector: 'app-listartipomaterial',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listartipomaterial.component.html',
  styleUrl: './listartipomaterial.component.css'
})
export class ListartipomaterialComponent implements OnInit{
  displayedColumns:String[]=['c1','c2','c3','c4'];
  dataSource:MatTableDataSource<TipoMaterial>=new MatTableDataSource()
  constructor(
    private tipoMservice:TipoMaterialService,
  ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.tipoMservice.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.tipoMservice.getList().subscribe(data=>{
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
    this.tipoMservice.deleteTipom(id).subscribe(data=>{
      this.tipoMservice.list().subscribe(data=>{
        this.tipoMservice.setList(data)
      })
    })
  }
}
