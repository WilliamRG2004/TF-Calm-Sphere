import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'app-insertareditarplaylist',
  imports: [
    MatInputModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarplaylist.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarplaylist.component.css'
})
export class InsertareditarplaylistComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  playlist:Playlist=new Playlist()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private playserv:PlaylistService,
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
      this.playlist.idPlaylist=this.form.value.codigo
      this.playlist.nombrePlaylist=this.form.value.nombre

      if(this.edicion){
        this.playserv.update(this.playlist).subscribe(()=>{
          this.playserv.list().subscribe(data=>{
            this.playserv.setList(data)
          })
        })
      }else{
        this.playserv.insert(this.playlist).subscribe(()=>{
          this.playserv.list().subscribe(data=>{
            this.playserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['playlist'])
  }

  init(){
    if(this.edicion){
      this.playserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idPlaylist),
          nombre:new FormControl(data.nombrePlaylist)

        })
      })
    }
  }
}
