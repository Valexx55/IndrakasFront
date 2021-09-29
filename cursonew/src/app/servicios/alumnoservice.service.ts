import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../modelo/alumno';

@Injectable({
  providedIn: 'root'//que se pueda usar desde cualquier componente
})
export class AlumnoserviceService {

  ruta_servidor : string = "http://localhost:8080"
  cabeceras : HttpHeaders = new HttpHeaders ({'Content-type' : 'application/json'});

  constructor(private http: HttpClient) {

    
   }


   //TODO LISTAR UN ALUMNO BUSCAR POR UN ALUMNO

   //mecanimos asincronos AJAX
   //Observables - mejor REACTIVA -rxjs - APACHE
   //Promesas 
   //observado


   public getAlumno(id: number) : Observable<HttpResponse<Alumno>>{
    return this.http.get<Alumno>(`${this.ruta_servidor}/${id}`,{ observe: 'response' });
  }

  //obtener lista de alumnos
   public listar () : Observable<Alumno[]>
    {
      console.log("Obteninedo lista de todos los alumnos");
      return this.http.get<Alumno[]>(this.ruta_servidor);
    }
//obtener lista de alumnos con cabeceras
    public listarConHttpCompleto () : Observable<HttpResponse<Alumno[]>>
    {
      return this.http.get<Alumno[]>(this.ruta_servidor, { observe: 'response' });
    }

    public crear (alumno : Alumno) : Observable<Alumno>
    {
      return this.http.post<Alumno>(this.ruta_servidor, alumno, {headers : this.cabeceras});
    }

    public actualizar (alumno : Alumno) : Observable<Alumno>
    {
      return this.http.put<Alumno>(this.ruta_servidor+"/"+alumno.id, alumno, {headers : this.cabeceras});
    }

    public eliminar (id: number): Observable<void>
    {
      //return this.http.delete<void> (this.ruta_servidor+"/"+id);
      return this.http.delete<void> (`${this.ruta_servidor}/${id}`);
    }

    public listarJsonp ()
    {
      return this.http.jsonp(`${this.ruta_servidor}/jsonp/alumno`, 'callback=JSONP_CALLBACK');
    }

}
