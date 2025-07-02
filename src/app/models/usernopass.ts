import { Role } from "./role";


export class Usernopass {
  id: number;
  username: string;
  enabled: boolean = false;
  correousuario: string;
  fechanacimientousuario: Date = new Date();
  roles: Role[];
}