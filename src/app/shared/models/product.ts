import { Ingredient } from './ingredientes';
export interface Product {
    id?: number;
    nombre: string;
    costeUnidad: number;
    disp: string;
    nombreImg: string;
    precio?: number;
    contador?: number;
    listaIngredientes: Ingredient[];
  }
