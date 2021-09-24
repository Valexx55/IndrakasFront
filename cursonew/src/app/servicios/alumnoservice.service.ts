import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../modelo/alumno';

@Injectable({
  providedIn: 'root'//que se pueda usar desde cualquier componente
})
export class AlumnoserviceService {

  ruta_servidor : string = "http://localhost:8080"

  constructor(private http: HttpClient) {

    
   }

   //mecanimos asincronos AJAX
   //Observables - mejor REACTIVA -rxjs - APACHE
   //Promesas 
   //observado

   public listar () : Observable<Alumno[]>
    {
      console.log("Obteninedo lista de todos los alumnos");
      return this.http.get<Alumno[]>(this.ruta_servidor);
    }
}
