import { Routes } from '@angular/router';
import { TerapiaComponent } from './components/terapia/terapia.component';
import { InsertareditarComponent } from './components/terapia/insertareditar/insertareditar.component';
import { MusicacategoriaComponent } from './components/musicacategoria/musicacategoria.component';
import { InsertareditarmucategoriaComponent } from './components/musicacategoria/insertareditarmucategoria/insertareditarmucategoria.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { InsertareditarplaylistComponent } from './components/playlist/insertareditarplaylist/insertareditarplaylist.component';
import { TipomaterialComponent } from './components/tipomaterial/tipomaterial.component';
import { InsertareditartipomaterialComponent } from './components/tipomaterial/insertareditartipomaterial/insertareditartipomaterial.component';
import { SesionterapiaComponent } from './components/sesionterapia/sesionterapia.component';
import { InsertareditarsesionterapiaComponent } from './components/sesionterapia/insertareditarsesionterapia/insertareditarsesionterapia.component';
import { ListarsesionporusuarioComponent } from './components/sesionterapia/listarsesionporusuario/listarsesionporusuario.component';
import { ListarsesioncompletadoporusuarioComponent } from './components/sesionterapia/listarsesioncompletadoporusuario/listarsesioncompletadoporusuario.component';
import { ListarusuariomoresesionComponent } from './components/sesionterapia/listarusuariomoresesion/listarusuariomoresesion.component';
import { ListarterapiamoresesionComponent } from './components/sesionterapia/listarterapiamoresesion/listarterapiamoresesion.component';
import { RoleComponent } from './components/role/role.component';
import { InsertareditarroleComponent } from './components/role/insertareditarrole/insertareditarrole.component';
import { UsersComponent } from './components/users/users.component';
import { InsertareditarusersComponent } from './components/users/insertareditarusers/insertareditarusers.component';
import { ProgresomusicarelajacionComponent } from './components/progresomusicarelajacion/progresomusicarelajacion.component';
import { InsertareditarprogresomusicarelajacionComponent } from './components/progresomusicarelajacion/insertareditarprogresomusicarelajacion/insertareditarprogresomusicarelajacion.component';
import { ListarmusicacompletaComponent } from './components/progresomusicarelajacion/listarmusicacompleta/listarmusicacompleta.component';
import { PorcentajeprogresoComponent } from './components/progresomusicarelajacion/porcentajeprogreso/porcentajeprogreso.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'terapia',pathMatch:'full'
  },
  {
    path: 'terapia',
    component: TerapiaComponent,
    children: [
      { path: 'nuevoterapia', component: InsertareditarComponent },
      { path: 'edicionesterapia/:id', component: InsertareditarComponent }
    ]
  },
  {
    path: 'musicacategoria',
    component: MusicacategoriaComponent,
    children: [
      { path: 'nuevomusicacategoria', component: InsertareditarmucategoriaComponent },
      { path: 'edicionesmusicacategoria/:id', component: InsertareditarmucategoriaComponent }
    ]
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    children: [
      { path: 'nuevoplaylist', component: InsertareditarplaylistComponent },
      { path: 'edicionesplaylist/:id', component: InsertareditarplaylistComponent }
    ]
  },
  {
    path: 'tipomaterial',
    component: TipomaterialComponent,
    children: [
      { path: 'nuevotipomaterial', component: InsertareditartipomaterialComponent },
      { path: 'edicionestipomaterial/:id', component: InsertareditartipomaterialComponent }
    ]
  },
  {
    path: 'sesionterapia',
    component: SesionterapiaComponent,
    children: [
      { path: 'nuevosesionterapia', component: InsertareditarsesionterapiaComponent },
      { path: 'edicionessesionterapia/:id', component: InsertareditarsesionterapiaComponent },
      { path: 'listporusuariosesionterapia', component: ListarsesionporusuarioComponent },
      { path: 'listporusuariocompletosesionterapia', component: ListarsesioncompletadoporusuarioComponent },
      { path: 'listporusuariomoresesionsesionterapia', component: ListarusuariomoresesionComponent },
      { path: 'listporterapiamoresesionsesionterapia', component: ListarterapiamoresesionComponent }

    ]
  },
  {
    path: 'role',
    component: RoleComponent,
    children: [
      { path: 'nuevorole', component: InsertareditarroleComponent },
      { path: 'edicionesrole/:id', component: InsertareditarroleComponent }
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'nuevousers', component: InsertareditarusersComponent },
      { path: 'edicionesusers/:id', component: InsertareditarusersComponent }
    ]
  },
  {
    path: 'progresomusicarelax',
    component: ProgresomusicarelajacionComponent,
    children: [
      { path: 'nuevoprogresomusicarelax', component: InsertareditarprogresomusicarelajacionComponent },
      { path: 'edicionesprogresomusicarelax/:id', component: InsertareditarprogresomusicarelajacionComponent },
      { path: 'musicacompletada', component: ListarmusicacompletaComponent },
      { path: 'porcentajeprogreso', component: PorcentajeprogresoComponent }
    ]
  }
  
];
