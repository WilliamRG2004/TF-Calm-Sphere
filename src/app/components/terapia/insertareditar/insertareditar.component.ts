import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Terapia } from '../../../models/terapia';
import { TerapiaService } from '../../../services/terapia.service';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatInputModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  terapia:Terapia=new Terapia()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private terapiaserv:TerapiaService,
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
        tipo:['', Validators.required],
        descripcion:['', Validators.required]
      })
  }

  aceptar(){
    if(this.form.valid){
      this.terapia.idTerapia=this.form.value.codigo
      this.terapia.tipoTerapia=this.form.value.tipo
      this.terapia.descripcionTerapia=this.form.value.descripcion

      if(this.edicion){
        this.terapiaserv.update(this.terapia).subscribe(()=>{
          this.terapiaserv.list().subscribe(data=>{
            this.terapiaserv.setList(data)
          })
        })
      }else{
        this.terapiaserv.insert(this.terapia).subscribe(()=>{
          this.terapiaserv.list().subscribe(data=>{
            this.terapiaserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['terapia'])
  }

  init(){
    if(this.edicion){
      this.terapiaserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idTerapia),
          tipo:new FormControl(data.tipoTerapia),
          descripcion:new FormControl(data.descripcionTerapia)

        })
      })
    }
  }
}
