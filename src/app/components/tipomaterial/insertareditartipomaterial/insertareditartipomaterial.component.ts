import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoMaterial } from '../../../models/tipoMaterial';
import { TipoMaterialService } from '../../../services/tipo-material.service';


@Component({
  selector: 'app-insertareditartipomaterial',
  imports: [
    MatInputModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditartipomaterial.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditartipomaterial.component.css'
})
export class InsertareditartipomaterialComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  tipomaterial:TipoMaterial=new TipoMaterial()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private tipomserv:TipoMaterialService,
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
      this.tipomaterial.idTipoMaterial=this.form.value.codigo
      this.tipomaterial.nombreTipoMaterial=this.form.value.nombre

      if(this.edicion){
        this.tipomserv.update(this.tipomaterial).subscribe(()=>{
          this.tipomserv.list().subscribe(data=>{
            this.tipomserv.setList(data)
          })
        })
      }else{
        this.tipomserv.insert(this.tipomaterial).subscribe(()=>{
          this.tipomserv.list().subscribe(data=>{
            this.tipomserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['tipomaterial'])
  }

  init(){
    if(this.edicion){
      this.tipomserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idTipoMaterial),
          nombre:new FormControl(data.nombreTipoMaterial)

        })
      })
    }
  }
}
