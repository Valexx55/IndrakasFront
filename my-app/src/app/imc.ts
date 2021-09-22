import { Tipoimc } from "./tipoimc";

export class Imc {


   

    public peso : number;
    public altura : number;
    public foto : string;
    public nominal: Tipoimc;
    public numerico: number;
    public lectura: string;

    constructor ()
    {
        this.peso=0;
        this.altura=0;
        this.foto="";
        this.nominal = Tipoimc.DELGADO;
        this.numerico =0;
        this.lectura = "";
    }
}
