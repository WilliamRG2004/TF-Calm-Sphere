import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProgresoMaterialMedi } from '../models/progresoMaterialMedi';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProgresoMaterialMediService {
  private url=`${base_url}/ProgresoMaterialMedi `
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<ProgresoMaterialMedi[]>(this.url)
  }
}
