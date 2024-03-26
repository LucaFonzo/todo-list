import { Injectable, inject } from '@angular/core';
import { Proyect } from './models/Proyect';
import { HttpClient } from '@angular/common/http';
import { ProyectForm } from './models/ProyectForm';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {
  private readonly API_URL = 'http://localhost:8080/api/proyect';
  http = inject(HttpClient);
  constructor() { }

  getAll() {
    return this.http.get<Proyect[]>(this.API_URL);
  }

  add(p: ProyectForm) {
    return this.http.post<Proyect>(this.API_URL,p);
  }

  delete(id: number) {
    return this.http.delete<Proyect>(`${this.API_URL}/${id}`);
  }

  update(p: Proyect) {
    return this.http.put<Proyect>(`${this.API_URL}/${p.id}`,p);
  }
}
