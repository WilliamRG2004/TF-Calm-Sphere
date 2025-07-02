import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'app-listarplaylist',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listarplaylist.component.html',
  styleUrl: './listarplaylist.component.css'
})
export class ListarplaylistComponent implements OnInit{
  displayedColumns:String[]=['c1','c2','c3','c4'];
  dataSource:MatTableDataSource<Playlist>=new MatTableDataSource()
  constructor(
    private playservice:PlaylistService,
  ){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.playservice.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.playservice.getList().subscribe(data=>{
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
    this.playservice.deletePlay(id).subscribe(data=>{
      this.playservice.list().subscribe(data=>{
        this.playservice.setList(data)
      })
    })
  }
}
