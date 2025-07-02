import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tarjeta } from '../models/tarjeta';
 const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private url=`${base_url}/Tarjeta`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tarjeta[]>(this.url)
  }
}
