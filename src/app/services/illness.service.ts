import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Illness } from '../models/Illness';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class IllnessService {
  private url = `${base_url}/Enfermedades`
  private listaCambio =new Subject<Illness[]>;

  constructor(private http: HttpClient) { };

  list(){
    return this.http.get<Illness[]>(this.url);
  }
  
  insert(i: Illness){
    return this.http.post(this.url, i);
  }

  getLiist( ){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Illness[]){
    this.listaCambio.next(listaNueva);
  }
  
}
