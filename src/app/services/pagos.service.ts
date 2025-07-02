import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagos } from '../models/pagos';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private url=`${base_url}/Pagos`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Pagos[]>(this.url)
  }
}
