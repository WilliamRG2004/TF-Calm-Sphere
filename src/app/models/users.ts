import { Role } from "./role";


export class Users {
  id: number;
  username: string;
  password: string;
  enabled: boolean = false;
  correousuario: string;
  fechanacimientousuario: Date = new Date();
  roles: Role[];
}
