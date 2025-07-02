import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SesionTerapia } from '../models/sesionTerapia';
import { Subject } from 'rxjs';
import { UsermoresesionHU } from '../models/usermoresesionHU';
import { TerapiamoresesionHU } from '../models/terapiamoresesionHU';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class SesionTerapiaService {
  private url=`${base_url}/SesionTerapia`
  private listacambio=new Subject<SesionTerapia[]>
  
  constructor(private hsesionterapia:HttpClient) { }
  list(){
    return this.hsesionterapia.get<SesionTerapia[]>(this.url + '/lista')
  }
  insert(st:SesionTerapia){
    return this.hsesionterapia.post(this.url + '/insertar',st)
  }
  setList(listaNueva:SesionTerapia[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hsesionterapia.get<SesionTerapia>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(ster:SesionTerapia){
    return this.hsesionterapia.put(this.url + '/edit',ster)
  }
  deleteST(id:number){
    return this.hsesionterapia.delete(`${this.url + '/eliminar'}/${id}`) 
  }
  listSesionUsuario(id:number){
    return this.hsesionterapia.get<SesionTerapia[]>(`${this.url+ '/sesionUsuario'}/${id}`)
  }
  listSesionCompletasUsuario(id:number){
    return this.hsesionterapia.get<SesionTerapia[]>(`${this.url + '/sesionCompletoUsuario'}/${id}`)
  }
  listUsermoresesion(){
    return this.hsesionterapia.get<UsermoresesionHU[]>(this.url + '/usuariomoresesiones')
  }
  listTerapiamoresesion(){
    return this.hsesionterapia.get<TerapiamoresesionHU[]>(this.url + '/terapiamoreused')
  }
}
