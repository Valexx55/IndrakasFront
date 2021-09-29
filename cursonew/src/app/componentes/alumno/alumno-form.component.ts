import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/modelo/alumno';
import { ErrorValidacionServidor } from 'src/app/modelo/error-validacion-servidor';
import { AlumnoserviceService } from 'src/app/servicios/alumnoservice.service';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  titulo: string = "FORMULARIO ALUMNO";
  alumno : Alumno = new Alumno (); //alumnno nuevo o en edición

  constructor(private router:Router , 
    private servicioalumno:AlumnoserviceService, 
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {

    let valor = localStorage.getItem("almuno");
    console.log("VAlor pasado = " + valor);

    //TODO_ OBTENER EL ID DE LA RUTA
    this.ruta.paramMap.subscribe (
      param => {
        let id = param.get('id');
        if (id != null)
        {
          console.log("Viene de editar");
          let alumno_serializado = sessionStorage.getItem("alumno_en_edicion");
          if (alumno_serializado!= null)
          {
            console.log("deserilizado ...");
            this.alumno = JSON.parse(alumno_serializado);
          }
          
          /*
          let n = parseInt(id);
          this.servicioalumno.getAlumno(n).subscribe ( respuesta => {
            this.alumno = respuesta.body as Alumno;
          })*/
        } else {
          console.log("Viene de crear");
        }
      }
    )
  }

  crear (a : Alumno)
  {
    console.log("insertar alumno " + a.nombre);
    this.servicioalumno.crear(a).subscribe (
      alumno_nuevo =>{console.log(alumno_nuevo)
      alert("Alumno creado con éxito");
      //this.router.navigate(['/alumnos']);
      this.router.navigateByUrl('/alumnos');}, 
      resperror => {
        if (resperror.status == 400)
        {
          console.log("errores en la validación del servidor");
          let lista_errores : Array<ErrorValidacionServidor> = resperror.error;
          let erroralert : string = "";
          lista_errores.forEach (
            ee => {
              erroralert = erroralert+ (ee.field + " " + ee.defaultMessage + " " + ee.objectName+"\n" ) ;
              console.log(ee.field + " " + ee.defaultMessage + " " + ee.objectName);}
          );
              alert("Errores en la validación del servidor \n" + erroralert);
          
          
        }

      }
    )
  }

  editar ()
  {
    console.log("modificar alumno " + this.alumno.nombre);
    //TODO TERMINAR EL ACTULIZAR EN EL SERVIDOR
    this.servicioalumno.actualizar(this.alumno).subscribe(
      alumnoeditado => { 
        alert ("Alumno modificado Correctamente");
        this.router.navigateByUrl('/alumnos');
      }
        , error => { 
          alert ("Error al actualizar");
          console.log(error);
        }
    )
  }

  ngOnDestroy() {
    console.log("saliendo ... limpio la session storage");
    sessionStorage.clear();
    
  }

}
