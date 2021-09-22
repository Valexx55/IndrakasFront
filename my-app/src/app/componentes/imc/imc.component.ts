import { Component, OnInit } from '@angular/core';
import { Imc } from 'src/app/imc';

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
  private static readonly FOTO_DESNUTRIDO: string = "assets/desnutrido.jfif";
  private static readonly FOTO_DELGADO: string = "assets/delgado.jfif";
  private static readonly FOTO_IDEAL: string = "assets/ideal.jfif";
  private static readonly FOTO_SOBREPESO: string = "assets/obeso.jpg";
  private static readonly FOTO_OBESO: string = "assets/sobrepeso.jpeg";


  constructor() {

    this.oimc = new Imc();
    /*this.peso= 0;
    this.altura = 0;
    this.imc = 0;
    this.lectura = "";
    this.foto = "";*/
  }

  ngOnInit(): void {
  }


  calcularImc() {
    if (this.oimc.peso != 0 && this.oimc.altura != 0) {
      const imcx = (this.oimc.peso / (this.oimc.altura * this.oimc.altura));
      this.oimc.numerico = imcx;
      console.log(imcx);
      //COMENTARIO
      if (imcx < 16) {
        this.oimc.lectura = "el cejas te puede";
        this.oimc.foto = ImcComponent.FOTO_DESNUTRIDO;
      }
      else if (imcx >= 16 && imcx < 18) {
        this.oimc.lectura = "el cejas no te puede";
        this.oimc.foto = ImcComponent.FOTO_DELGADO;
      }
      else if (imcx >= 18 && imcx < 25) {
        this.oimc.lectura = "no te vendria mal comer mas fruta";
        this.oimc.foto = ImcComponent.FOTO_IDEAL;
      }
      else if (imcx >= 25 && imcx < 31) {
        this.oimc.lectura = "tas gordito eh";
        this.oimc.foto = ImcComponent.FOTO_SOBREPESO;
      }
      else if (imcx > 31) {
        this.oimc.lectura = "menos phoskitos ibai";
        this.oimc.foto = ImcComponent.FOTO_OBESO;
      }

    } else {
      alert("Debes ingresar peso y altura, enga q no te de bergÜensita.")
    }
  }

}
