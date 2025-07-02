import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Terapia } from '../models/terapia';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class TerapiaService {
  private url=`${base_url}/terapia`
  private listacambio=new Subject<Terapia[]>

  constructor(private hterapia:HttpClient) { }
  list(){
    return this.hterapia.get<Terapia[]>(this.url + '/lista')
  }
  insert(t:Terapia){
  return this.hterapia.post(this.url + '/insertar',t)
  }
  setList(listaNueva:Terapia[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hterapia.get<Terapia>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(tr:Terapia){
    return this.hterapia.put(this.url + '/edit',tr)
  }
  deleteT(id:number){
    return this.hterapia.delete(`${this.url + '/eliminar'}/${id}`) 
  }
}
