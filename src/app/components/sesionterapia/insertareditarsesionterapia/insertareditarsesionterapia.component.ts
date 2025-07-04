import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SesionTerapia } from '../../../models/sesionTerapia';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Users } from '../../../models/users';
import { Terapia } from '../../../models/terapia';
import { UsersService } from '../../../services/users.service';
import { TerapiaService } from '../../../services/terapia.service';
import {MatSelectModule} from '@angular/material/select';
import { Usernopass } from '../../../models/usernopass';

@Component({
  selector: 'app-insertareditarsesionterapia',
  imports: [
    MatInputModule,
    MatCheckboxModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insertareditarsesionterapia.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarsesionterapia.component.css'
})
export class InsertareditarsesionterapiaComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  sesionterapia:SesionTerapia=new SesionTerapia()
  listaUsuarios:Usernopass[]=[]
  listaTerapia:Terapia[]=[]

  id:number=0
  edicion:boolean=false

toggleEstado(valor: boolean) {
  const estadoActual = this.form.get('estado')?.value;

  // Si ya está marcado con ese valor, lo deselecciona (coloca null)
  if (estadoActual === valor) {
    this.form.get('estado')?.setValue(null);
  } else {
    this.form.get('estado')?.setValue(valor);
  }
}



  constructor(
    private formBuilder:FormBuilder,
    private sesionterapiaserv:SesionTerapiaService,
    private router:Router,
    private route:ActivatedRoute,
    private usS:UsersService,
    private teS:TerapiaService,

  ){}

 ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      this.init()

    })
      this.form=this.formBuilder.group({
        codigo:[''],
        fechainicio:['', Validators.required],
        fechafin:['', Validators.required],
        estado:['', Validators.required],
        us:['', Validators.required],
        te:['', Validators.required],  
    })

        this.usS.list().subscribe(data=>{
      this.listaUsuarios=data
    })

        this.teS.list().subscribe(data=>{
      this.listaTerapia=data
    })
  }

  aceptar(){
    if(this.form.valid){
      this.sesionterapia.idSesion=this.form.value.codigo
      this.sesionterapia.fechaInicio=this.form.value.fechainicio
      this.sesionterapia.fechaFin=this.form.value.fechafin
      this.sesionterapia.completado=this.form.value.estado
      this.sesionterapia.usuario = new Users();
      this.sesionterapia.usuario.id=this.form.value.us
      this.sesionterapia.terapia = new Terapia();
      this.sesionterapia.terapia.idTerapia=this.form.value.te

      if(this.edicion){
        this.sesionterapiaserv.update(this.sesionterapia).subscribe(()=>{
          this.sesionterapiaserv.list().subscribe(data=>{
            this.sesionterapiaserv.setList(data)
          })
        })
      }else{
        this.sesionterapiaserv.insert(this.sesionterapia).subscribe(()=>{
          this.sesionterapiaserv.list().subscribe(data=>{
            this.sesionterapiaserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['sesionterapia'])
  }
  init(){
    if(this.edicion){
      this.sesionterapiaserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idSesion),
          fechainicio:new FormControl(data.fechaInicio),
          fechafin:new FormControl(data.fechaFin),
          estado:new FormControl(data.completado),
          us:new FormControl(data.usuario.id),
          te:new FormControl(data.terapia.idTerapia)
        })
      })
    }
  }
}
