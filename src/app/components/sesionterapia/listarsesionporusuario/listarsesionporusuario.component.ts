import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { SesionTerapia } from '../../../models/sesionTerapia';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarsesionporusuario',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './listarsesionporusuario.component.html',
  styleUrl: './listarsesionporusuario.component.css'
})
export class ListarsesionporusuarioComponent implements OnInit{
  displayedColumns:String[]=['c1','c2','c3','c4','c5','c6'];
  dataSource:MatTableDataSource<SesionTerapia>=new MatTableDataSource()

  form:FormGroup;
  notResults:boolean=false
  idusuarioBusqueda:number=0

  constructor(private seteraserv:SesionTerapiaService, private fb:FormBuilder){
    this.form=fb.group({
      idusuarioparasesion:['']
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  ngOnInit(): void {
      this.seteraserv.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.form.get('idusuarioparasesion')?.valueChanges.subscribe(value=>{
        this.idusuarioBusqueda=value
        this.buscar()
      })
  }

  buscar(){
      if(this.idusuarioBusqueda!=0){
          this.seteraserv.listSesionUsuario(this.idusuarioBusqueda).subscribe(data=>{
             this.dataSource=new MatTableDataSource(data)
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
             this.notResults=data.length===0
          })
          
      }else{
        this.seteraserv.list().subscribe(data=>{
          this.dataSource=new MatTableDataSource(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.notResults=false
        })
      }
    }
}
