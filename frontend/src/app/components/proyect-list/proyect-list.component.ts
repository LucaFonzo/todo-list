import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-proyect-list',
    standalone: true,
    templateUrl: './proyect-list.component.html',
    styleUrl: './proyect-list.component.css',
    imports: [HeaderComponent]
})
export class ProyectListComponent {
  proyects = [
    {
      id: 1,
      name: "Proyect 1",
      description: "Description 1"
    },
    {
      id: 2,
      name: "Proyect 2",
      description: "Description 2"
    },
    {
      id: 3,
      name: "Proyect 3",
      description: "Description 3"
    }
  ]

}
