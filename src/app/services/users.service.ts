import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Subject } from 'rxjs';
import { Usernopass } from '../models/usernopass';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private url=`${base_url}/usuario`
  private listacambio=new Subject<Usernopass[]>

  constructor(private husuario:HttpClient) { }
  
  list(){
     return this.husuario.get<Usernopass[]>(this.url + '/lista')
   }
   insert(u:Users){
   return this.husuario.post(this.url + '/insertarusuario',u)
   }
   setList(listaNueva:Usernopass[]){
     this.listacambio.next(listaNueva)
   }
   getList(){
     return this.listacambio.asObservable()
   }
   listid(id:number){
     return this.husuario.get<Users>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
   }
   update(us:Users){
     return this.husuario.put(this.url + '/edit',us)
   }
   deleteUs(id:number){
     return this.husuario.delete(`${this.url + '/eliminar'}/${id}`) 
   }
}
