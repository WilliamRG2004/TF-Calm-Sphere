import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BilleteraElectronica } from '../models/billeteraElectronica';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})

export class BilleteraElectronicaService {
  private url=`${base_url}/BilleteraElectronica`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<BilleteraElectronica[]>(this.url)
  }
}
