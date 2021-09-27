import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/modelo/alumno';
import { AlumnoserviceService } from 'src/app/servicios/alumnoservice.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
  // providers: [AlumnoserviceService]
})
//COMPONENTE DEDICADO A LISTAR LOS ALUMNOS
export class AlumnoComponent implements OnInit {

  listaAlumnos: Alumno[];
  titulo: string = "LISTADO DE ALUMNOS";
  automatico: boolean;
  idinterval: any;

  //INYECCIÓN DE SERVICIOS
  constructor(public servicio: AlumnoserviceService) {
    this.listaAlumnos = [];
    this.automatico = false;
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
    /*this.servicio.listar().subscribe(
      alumnos => {
        console.log(alumnos);
        this.listaAlumnos = alumnos;
      }
      , fallo => {alert ("Fallo del servidor"); console.error(fallo)});*/
    //suscribirnos observadores

    this.servicio.listarConHttpCompleto().subscribe(
      httpresp => {
        console.log(httpresp.status);
        this.listaAlumnos = <Alumno[]>httpresp.body;//casting
        //console.log(alumnos);
        //this.listaAlumnos = alumnos;
      }
      , fallo => { alert("Fallo del servidor"); console.error(fallo) });
    //suscribirnos observadores
  }


  checkTocado() {

    this.automatico = !this.automatico;
    console.log("check tocado auto = " + this.automatico);
    if (this.automatico) {
      this.programarActualizacionAtutomatica();
    } else {
      this.desprogramarActualizacionAutomatica();
    }
  }

  programarActualizacionAtutomatica() {
    this.idinterval = setInterval(() => {
      console.log("actualizando ...");
      this.servicio.listar().subscribe
        (
          alumnos => { this.listaAlumnos = alumnos; }
          ,
          error => { console.log(error); alert(error) }
        );
    }, 3000); //this en una f() anónima es el ámbito que lo engloba (superior)
    //this.idinterval = setInterval ( function () { console.log("actualizando ...");}, 3000);
  }


  eliminar(alumno: Alumno): void {
    console.log("quiere eliminar a " + alumno.nombre);
    if (confirm("¿Quieres eliminar a " + alumno.nombre)) {
      //sí
      this.servicio.eliminar(alumno.id).subscribe(() => {
        //ACTUALIZAR LA LISTA
        this.listaAlumnos = this.listaAlumnos.filter(a => a.id != alumno.id);
        alert("Alumno elminado con éxito");
      }, error => { console.error(error); })
    } else {
      //no quiere elininarlo
      console.log("el usuario no confirma el borrrado");
    }
  }

  desprogramarActualizacionAutomatica() {
    clearInterval(this.idinterval);
  }

  ngOnDestroy() {
    console.log("saliendo ...");
    if (this.idinterval) {
      clearInterval(this.idinterval);
    }
  }
}


