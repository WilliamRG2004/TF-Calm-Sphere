import { Users } from "./users";



export class Membresia {
  idMembresia: number = 0;
  fechainicioMembresia: Date = new Date();
  fechafinalMembresia: Date = new Date();
  estadoMembresia: boolean = false;
  users: Users=new Users(); 
}
