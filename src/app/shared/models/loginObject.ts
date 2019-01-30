export class LoginObject {
    public usuario: string;
    public password: string;

    constructor( object: any){
        this.usuario = (object.usuario) ? object.usuario : null;
        this.password = (object.password) ? object.password : null;
      }
  }