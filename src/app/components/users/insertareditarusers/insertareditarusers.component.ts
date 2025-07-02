import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-insertareditarusers',
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
  templateUrl: './insertareditarusers.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarusers.component.css'
})
export class InsertareditarusersComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  users:Users=new Users()

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
    private router:Router,
    private route:ActivatedRoute,
    private usS:UsersService,

  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      this.init()

    })
      this.form=this.formBuilder.group({
        codigo:[''],
        userName:['', Validators.required],
        passWord: ['', Validators.required], 
        estado:['', Validators.required],
        correo:['', Validators.required],
        fecha:['', Validators.required],
    })

  }

  aceptar(){
    if(this.form.valid){

      this.users.id=this.form.value.codigo
      this.users.username=this.form.value.userName
      this.users.password=this.form.value.passWord
      this.users.enabled=this.form.value.estado
      this.users.correousuario=this.form.value.correo
      this.users.fechanacimientousuario=this.form.value.fecha

      if(this.edicion){
        this.usS.update(this.users).subscribe(()=>{
          this.usS.list().subscribe(data=>{
            this.usS.setList(data)
          })
        })
      }else{
        this.usS.insert(this.users).subscribe(()=>{
          this.usS.list().subscribe(data=>{
            this.usS.setList(data)
          })
        })
      }
    }
    this.router.navigate(['users'])
  }

  init(){
    if(this.edicion){
      this.usS.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.id),
          userName:new FormControl(data.username),
          passWord:new FormControl(data.password),
          estado:new FormControl(data.enabled),
          correo:new FormControl(data.correousuario),
          fecha:new FormControl(data.fechanacimientousuario),

        })
      })
    }
  }
}
