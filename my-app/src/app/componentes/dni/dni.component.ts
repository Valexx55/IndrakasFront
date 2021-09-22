import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})
export class DniComponent implements OnInit {

  public letra : string;
  public numero : number;
  public titutlo : string = "Cálculo de la letra del DNI";

  private static readonly SECUENCIA:string = "TRWAGMYFPDXBNJZSQVHLCKE";

/*
menos de 16 -- desnutrido
mayor o igual de 16 y menor de 18 -- delgado
mayor o igual de 18 y menor de 25 -- ideal / normal
mayor o igual de 25 y menor de 31 -- sobrepeso 
mayor o igual de 31 -- obesidad 


*/

  constructor() {
    //inicizlizar las propiedades
    console.log("En el constructor");
    this.letra  ='';
    this.numero = 50;

   }

  ngOnInit(): void {
    //funcionalidad del component
    console.log("En el init");
  }

  calcularLetra() {
    console.log("Ha tocado al boton");
    console.log("Numero intro = " + this.numero);
    let posicion:number = 0;
    posicion = this.numero%23;
    this.letra = DniComponent.SECUENCIA.charAt(posicion);
    console.log(this.letra);
    console.log(`la letra es ${this.letra}`);
    
  
    
  }



}
