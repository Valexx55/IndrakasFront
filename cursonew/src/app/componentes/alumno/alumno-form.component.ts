import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/modelo/alumno';
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
          //TODO OBTENER LOS DATOS 
          let n = parseInt(id);
          this.servicioalumno.getAlumno(n).subscribe ( respuesta => {
            this.alumno = respuesta.body as Alumno;
          })
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
      this.router.navigateByUrl('/alumnos')}
    )
  }

  editar (a: Alumno)
  {
    console.log("modificar alumno " + a.nombre);
    //TODO TERMINAR EL ACTULIZAR EN EL SERVIDOR
  }

}
