import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/modelo/alumno';
import { AlumnoserviceService } from 'src/app/servicios/alumnoservice.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
//COMPONENTE DEDICADO A LISTAR LOS ALUMNOS
export class AlumnoComponent implements OnInit {

  listaAlumnos : Alumno[];
  titulo : string = "LISTADO DE ALUMNOS";

  //INYECCIÓN DE SERVICIOS
  constructor(public servicio : AlumnoserviceService) { 
    this.listaAlumnos = [];
  }

  ngOnInit(): void {

    
    /*let a1 : Alumno;
    a1 = new Alumno();

    a1.apellido = "Messi";
    a1.nombre = "Leo";
    a1.email = "leo@mail.es"
    a1.id = 5;

    this.listaAlumnos.push(a1);
    this.listaAlumnos.push(a1);*/

    //yo me suscribo al observable
    //y cuando el observable cambie de estado - la lista está disponible 
    //se invoca al método suscribe
    this.servicio.listar().subscribe(
      alumnos => {
        console.log(alumnos);
      }
    ); //suscribirnos observadores

  }

}
