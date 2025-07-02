import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TecnicaMeditacion } from '../models/tecnicaMeditacion';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TecnicaMeditacionService {
  private url=`${base_url}/TecMeditacion`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TecnicaMeditacion[]>(this.url)
  }


}
