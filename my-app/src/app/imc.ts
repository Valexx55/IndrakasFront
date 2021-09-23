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
        this.peso=80;
        this.altura=1.80;
        this.foto="";
        this.nominal = Tipoimc.DELGADO;
        this.numerico =0;
        this.lectura = "";
    }

    public toString () : string  
    {
        return (this.altura + " " + this.peso + " "+Tipoimc[this.nominal]);
    }
}
