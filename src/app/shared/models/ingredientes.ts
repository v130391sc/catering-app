export class Ingredient {
    id?:number;
    nombre:string;
    marca:string;
    alergenos:string;

    constructor(nombre:string, marca:string, alergenos:string ){
      this.nombre = nombre;
      this.marca = marca;
      this.alergenos = alergenos;
    }
  }
