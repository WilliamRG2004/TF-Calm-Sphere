import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MusicaCategoria } from '../../../models/musicaCategoria';
import { MusicaCategoriaService } from '../../../services/musica-categoria.service';

@Component({
  selector: 'app-insertareditarmucategoria',
  imports: [
    MatInputModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarmucategoria.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarmucategoria.component.css'
})
export class InsertareditarmucategoriaComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  musicaCategoria:MusicaCategoria=new MusicaCategoria()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private mucserv:MusicaCategoriaService,
    private router:Router,
    private route:ActivatedRoute

  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      this.init()

    })
      this.form=this.formBuilder.group({
        codigo:[''],
        nombre:['', Validators.required]
      })
  }

  aceptar(){
    if(this.form.valid){
      this.musicaCategoria.idMusicaCategoria=this.form.value.codigo
      this.musicaCategoria.nombreCategoria=this.form.value.nombre

      if(this.edicion){
        this.mucserv.update(this.musicaCategoria).subscribe(()=>{
          this.mucserv.list().subscribe(data=>{
            this.mucserv.setList(data)
          })
        })
      }else{
        this.mucserv.insert(this.musicaCategoria).subscribe(()=>{
          this.mucserv.list().subscribe(data=>{
            this.mucserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['musicacategoria'])
  }

  init(){
    if(this.edicion){
      this.mucserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idMusicaCategoria),
          nombre:new FormControl(data.nombreCategoria)

        })
      })
    }
  }
}
