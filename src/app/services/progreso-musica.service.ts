import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProgresomusicaS } from '../models/progresoMusica';
import { Subject } from 'rxjs';
import { PorcentajeDTO } from '../models/porcentajeDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProgresoMusicaService {
  private url=`${base_url}/ProgresomusicaS`
  private listacambio=new Subject<ProgresomusicaS[]>
  
  constructor(private hprogmusrelax:HttpClient) { }
  list(){
    return  this.hprogmusrelax.get<ProgresomusicaS[]>(this.url + '/lista')
  }
  insert(promurelax:ProgresomusicaS){
    return this.hprogmusrelax.post(this.url + '/insertar',promurelax)
  }
  setList(listaNueva:ProgresomusicaS[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hprogmusrelax.get<ProgresomusicaS>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(progrelax:ProgresomusicaS){
    return this.hprogmusrelax.put(this.url + '/edit',progrelax)
  }
  deleteMucrelax(id:number){
    return this.hprogmusrelax.delete(`${this.url + '/eliminar'}/${id}`) 
  }
  listprogresoid(id:number){
    return this.hprogmusrelax.get<PorcentajeDTO>(`${this.url + '/progreso'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  listMusicacompleta(id:number){
    return this.hprogmusrelax.get<ProgresomusicaS[]>(`${this.url + '/musicacompleta'}/${id}`)
  }
}
