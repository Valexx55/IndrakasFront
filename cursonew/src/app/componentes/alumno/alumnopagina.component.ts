import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/modelo/alumno';
import { AlumnoserviceService } from 'src/app/servicios/alumnoservice.service';

@Component({
  selector: 'app-alumnopagina',
  templateUrl: './alumnopagina.component.html',
  styleUrls: ['./alumnopagina.component.css']
})
export class AlumnopaginaComponent implements OnInit {

  listaAlumnos: Alumno[];
  titulo: string = "LISTADO DE ALUMNOS";
  automatico: boolean;
  idinterval: any;

  public totalRegistros: number = 0;
  public totalPorPagina: number = 5;
  public paginaActual: number = 0;
  public pageSizeOptions: number  []= [5, 10, 15, 25];



  @ViewChild(MatPaginator) paginador:MatPaginator;

  //INYECCIÓN DE SERVICIOS
  constructor(public servicio: AlumnoserviceService, private router:Router) {
    this.listaAlumnos = [];
    this.automatico = false;
   
  }

  ngAfterViewInit ()
  {
    //MÉTODO QUE SE VA EJECUTAR DESPUÉS DE CARGAR LA PLANTILLA
    this.paginador._intl.itemsPerPageLabel = "Registros por página";
  }

  ngOnInit(): void {

    localStorage.setItem("almuno", "vale");

   
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

    //DEVOLVEMOS UN JSON
  this.servicio.listarConHttpCompleto().subscribe(
      httpresp => {
        console.log(httpresp.status);
        this.listaAlumnos = <Alumno[]>httpresp.body;//casting
        //console.log(alumnos);
        //this.listaAlumnos = alumnos;
      }
      , fallo => { alert("Fallo del servidor"); console.error(fallo) });
   
  }

  irAEditar(alumno : Alumno)
  {
    //TODO TENGO QUE TRANSITAR PROGRAMÁTICAMENTE  
    //AL FORMULARIO ALUMNO-FORM PASÁNDLE ESTE ALUMNO POR LA MEMORIA DEL NAVEGADOR
    
    let alumno_json = JSON.stringify(alumno);//serializarlo
    console.log(" alumno_json  = " + alumno_json );
    sessionStorage.setItem("alumno_en_edicion", alumno_json);
    this.router.navigate(['/alumnos/form', alumno.id]);


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
  //TODO:LLAMAR AL SERVICIO DE JSONP

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
