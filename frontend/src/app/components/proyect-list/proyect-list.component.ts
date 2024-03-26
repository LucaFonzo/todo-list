import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Proyect } from '../../services/models/Proyect';
import { ProyectService } from '../../services/proyect.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-proyect-list',
    standalone: true,
    templateUrl: './proyect-list.component.html',
    styleUrl: './proyect-list.component.css',
    imports: [HeaderComponent,FormsModule]
})
export class ProyectListComponent {
  _proyectService = inject(ProyectService);
  name = "";
  proyects: Proyect[] = []
  editandoId: number | null = null;
  nuevoNombre: string = '';
  constructor() {
    this.getProyects()
  }

  getProyects() {
    this._proyectService.getAll().subscribe(result => {
      this.proyects = result;
    })
  }

  add() {
    console.log(this.name);
    return this._proyectService.add({ name: this.name }).subscribe(result => {
      this.proyects.push(result);
    })
  }

  delete(id: number) {
    return this._proyectService.delete(id).subscribe(result => {
      this.proyects = this.proyects.filter(p => p.id != result.id);
    })
  }
  edit(proyect: Proyect) {
    this.editandoId = proyect.id;
    this.nuevoNombre = proyect.name;
  }

  update(proyect: Proyect) {
    proyect.name = this.nuevoNombre;
    return this._proyectService.update(proyect).subscribe(result => {
      this.proyects = this.proyects.filter(p => p.id !== proyect.id);
      this.proyects.unshift(result);
      this.editandoId = null;
    })
  }
}
