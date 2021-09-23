import { Component, OnInit } from '@angular/core';
import { Imc } from 'src/app/imc';
import { Tipoimc } from 'src/app/tipoimc';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {


  // public peso : number;
  // public altura : number;
  // public lectura : string;
  // public foto : string;
  // public titutlo : string = "Cálculo de la letra del IMC";
  // public imc: number;

  public titulo:string = "CÁLCULO DEL IMC";
  public oimc: Imc;
  public array_imc : Array<Imc>;
  private static readonly FOTO_DESNUTRIDO: string = "assets/desnutrido.jfif";
  private static readonly FOTO_DELGADO: string = "assets/delgado.jfif";
  private static readonly FOTO_IDEAL: string = "assets/ideal.jfif";
  private static readonly FOTO_SOBREPESO: string = "assets/obeso.jpg";
  private static readonly FOTO_OBESO: string = "assets/sobrepeso.jpeg";


  constructor() {

    this.oimc = new Imc();
    this.array_imc = new Array<Imc>();
    /*this.peso= 0;
    this.altura = 0;
    this.imc = 0;
    this.lectura = "";
    this.foto = "";*/
  }

  ngOnInit(): void {
  }


  mostrarArray ()
  {
    
    //forEach
    //map
    //filter

    /**
     * 
     * 1.- obtener la media del peso
     * 2.- obtener la media del altura
     * 3.- array sólo con obesos
     * 4.- un array nuevo, con todos con un kilo de más (copia)
     * 5.- el mismo array original, con todos con un kilo de más (this)
     */


    console.log("FOR EACH");
    this.array_imc.forEach( e => console.log(e.toString()));

    /*for (let eimc of this.array_imc)
    {
      console.log("Tipo imc = " + Tipoimc[eimc.nominal]);
      console.log("tostring " + eimc.toString());
      console.log(`ALTURA ${eimc.altura}`);
      console.log(`PESO ${eimc.peso}`);
      console.log(`IMC num ${eimc.numerico}`);
      console.log(`IMC nom ${eimc.nominal}`);
      console.log(`FOTO ${eimc.foto}`);
    }*/
  }

  nuevoItemArray (oimc:Imc) : Imc
  {
    let imc_aux: Imc;

      imc_aux = new Imc();
      imc_aux.altura = oimc.altura;
      imc_aux.peso = oimc.peso;
      imc_aux.foto = oimc.foto;
      imc_aux.nominal = oimc.nominal;
      imc_aux.numerico = oimc.numerico;
      imc_aux.lectura = oimc.lectura;
    
    return imc_aux;
  }

  calcularImc() { 

    if (this.oimc.peso != 0 && this.oimc.altura != 0) {
      const imcx = (this.oimc.peso / (this.oimc.altura * this.oimc.altura));
      this.oimc.numerico = imcx;
      console.log(imcx);
      //COMENTARIO
      if (imcx < 16) {
        this.oimc.lectura = Tipoimc[Tipoimc.DESNUTRIDO]; // "el cejas te puede";
        this.oimc.foto = ImcComponent.FOTO_DESNUTRIDO;
        this.oimc.nominal = Tipoimc.DESNUTRIDO;
      }
      else if (imcx >= 16 && imcx < 18) {
        this.oimc.lectura = Tipoimc[Tipoimc.DELGADO];//"el cejas no te puede";
        this.oimc.foto = ImcComponent.FOTO_DELGADO;
        this.oimc.nominal = Tipoimc.DELGADO;
      }
      else if (imcx >= 18 && imcx < 25) {
        this.oimc.lectura = Tipoimc[Tipoimc.IDEAL];//"no te vendria mal comer mas fruta";
        this.oimc.foto = ImcComponent.FOTO_IDEAL;
        this.oimc.nominal = Tipoimc.IDEAL;
      }
      else if (imcx >= 25 && imcx < 31) {
        this.oimc.lectura =  Tipoimc[Tipoimc.SOBREPESO];//"tas gordito eh";
        this.oimc.foto = ImcComponent.FOTO_SOBREPESO;
        this.oimc.nominal = Tipoimc.SOBREPESO;
      }
      else if (imcx > 31) {
        this.oimc.lectura = Tipoimc[Tipoimc.OBESO];//"menos phoskitos ibai";
        this.oimc.foto = ImcComponent.FOTO_OBESO;
        this.oimc.nominal = Tipoimc.OBESO;
      }

      //let imc_aux :Imc = this.nuevoItemArray (this.oimc);
      let imc_aux = this.nuevoItemArray (this.oimc);
  
      this.array_imc.push(imc_aux);
      console.log(`ARRAY DE IMCS = ${this.array_imc}`);
      this.mostrarArray();    



    } else {
      alert("Debes ingresar peso y altura, enga q no te de bergÜensita.")
    }
  }
  ordenarPorPeso ()
  {
    console.log("Ordenando por peso...");
    this.array_imc.sort (
      function (a, b) {
        //si a es mayor, devuelvo +
        //si b es mayor, devuelvo -
        //si son iguales, devuelvo 0
        return (a.peso-b.peso);
      }
    )
  }

  ordenarPorAlutra ()
  {
    console.log("Ordenando por altura...");
    this.array_imc.sort (
      function (a, b) {
        //si a es mayor, devuelvo +
        //si b es mayor, devuelvo -
        //si son iguales, devuelvo 0
        return (a.altura-b.altura);
      }
    )
  }

  limpiar ()
  {
    console.log("Limpiando...");
    //this.array_imc = new Array<Imc>();
    this.array_imc.length = 0;


  }
}
