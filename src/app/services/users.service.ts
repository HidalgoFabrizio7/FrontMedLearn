import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';


const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${base_url}/Usuarios`;
  private listaCambio = new Subject<Users[]>();

  constructor(private http: HttpClient) { };

  list(){
    return this.http.get<Users[]>(`${this.url}/listado`);
  }
  insert(u: Users){
    return this.http.post(`${base_url}/crearcuenta`, u);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }

  update(us: Users) {
    return this.http.put(`${this.url}/modificar`, us);
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  searchByName(name: String) {
    return this.http.get<Users>(`${this.url}/buscarpornombre`);
  }


}
