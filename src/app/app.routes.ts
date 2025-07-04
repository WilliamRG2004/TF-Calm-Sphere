import { Routes } from '@angular/router';
import { TerapiaComponent } from './components/terapia/terapia.component';
import { InsertareditarComponentTerapia } from './components/terapia/insertareditar/insertareditar.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { InsertareditarComponentPlaylist } from './components/playlist/insertareditar/insertareditar.component';
import { CategoriaMusicalComponent } from './components/categoria-musical/categoria-musical.component';
import { InsertareditarComponentCategoriaMusical } from './components/categoria-musical/insertareditar/insertareditar.component';
import { TipoMaterialComponent } from './components/tipo-material/tipo-material.component';
import { InsertareditarComponentTipoMaterial } from './components/tipo-material/insertareditar/insertareditar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TecnicaMeditacionComponent } from './components/tecnica-meditacion/tecnica-meditacion.component';
import { InsertareditartecnicameditacionComponentTecnicaMeditacion } from './components/tecnica-meditacion/insertareditartecnicameditacion/insertareditartecnicameditacion.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { GaleriaRelajanteComponent } from './components/galeria-relajante/galeria-relajante.component';
import { VideoTecnicaRespiracionComponent } from './components/video-tecnica-respiracion/video-tecnica-respiracion.component';
import { InsertareditarComponentVideoTecnicaRespiracion } from './components/video-tecnica-respiracion/insertareditar/insertareditar.component';
import { InsertareditarComponentUsuario } from './components/usuario/insertareditar/insertareditar.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarComponentRol } from './components/rol/insertareditar/insertareditar.component';
import { PagoComponent } from './components/pago/pago.component';
import { InsertareditarComponentPago } from './components/pago/insertareditar/insertareditar.component';
import { BilleteraElectronicaComponent } from './components/billetera-electronica/billetera-electronica.component';
import { InsertareditarComponentBilleteraElectronica } from './components/billetera-electronica/insertareditar/insertareditar.component';
import { MaterialMeditacionComponent } from './components/material-meditacion/material-meditacion.component';
import { InsertareditarComponentMaterialMeditacion } from './components/material-meditacion/insertareditar/insertareditar.component';
import { MusicaRelajacionComponent } from './components/musica-relajacion/musica-relajacion.component';
import { InsertareditarComponentMusicaRelajacion } from './components/musica-relajacion/insertareditar/insertareditar.component';
import { SesionTerapiaComponent } from './components/sesion-terapia/sesion-terapia.component';
import { InsertareditarComponentSesionTerapia } from './components/sesion-terapia/insertareditar/insertareditar.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { InsertareditarComponentMembresia } from './components/membresia/insertareditar/insertareditar.component';
import { ProgresoMaterialMeditacionComponent } from './components/progreso-material-meditacion/progreso-material-meditacion.component';
import { InsertareditarComponentProgresoMaterialMeditacion } from './components/progreso-material-meditacion/insertareditar/insertareditar.component';
import { ProgresoMusicaComponent } from './components/progreso-musica/progreso-musica.component';
import { InsertareditarComponentProgresoMusicaRelajacion } from './components/progreso-musica/insertareditar/insertareditar.component';
import { ProgresoVideoComponent } from './components/progreso-video/progreso-video.component';
import { InsertareditarComponentProgresoVideo } from './components/progreso-video/insertareditar/insertareditar.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { InsertareditarComponentTarjeta } from './components/tarjeta/insertareditar/insertareditar.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';

export const routes: Routes = [
    {
        path:'',redirectTo:'menuCalmSphere',pathMatch:'full'
    },
    {
        path: 'login', component:LoginComponent,
    },
    {
        path:'terapias', component:TerapiaComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentTerapia
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentTerapia
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path:'playlists', component:PlaylistComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentPlaylist
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentPlaylist
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path:'categoriasmusicales', component:CategoriaMusicalComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentCategoriaMusical
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentCategoriaMusical
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path:'tiposmateriales', component:TipoMaterialComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentTipoMaterial
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentTipoMaterial
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'usuarios/nuevo', component:InsertareditarComponentUsuario
    },
    {
        path:'usuarios', component:UsuarioComponent,
        children:[
            {
                path:'ediciones/:id', component:InsertareditarComponentUsuario
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path:'tecnicasmeditaciones', component:TecnicaMeditacionComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditartecnicameditacionComponentTecnicaMeditacion
            },
            {
                path:'ediciones/:id', component:InsertareditartecnicameditacionComponentTecnicaMeditacion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'chatbot', component:ChatbotComponent,
        canActivate: [seguridadGuard],
    },
    {
        path: 'galeriasrelajantes', component:GaleriaRelajanteComponent,
        canActivate: [seguridadGuard],
    },
    {
        path:'videostecnicasrespiraciones', component:VideoTecnicaRespiracionComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentVideoTecnicaRespiracion
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentVideoTecnicaRespiracion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'roles', component:RolComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentRol
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentRol
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'pagos', component:PagoComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentPago
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentPago
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'billeteraselectronicas', component:BilleteraElectronicaComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentBilleteraElectronica
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentBilleteraElectronica
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'materialesmeditaciones', component:MaterialMeditacionComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentMaterialMeditacion
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentMaterialMeditacion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'musicasrelajaciones', component:MusicaRelajacionComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentMusicaRelajacion
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentMusicaRelajacion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'sesionesterapias', component:SesionTerapiaComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentSesionTerapia
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentSesionTerapia
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'membresias', component:MembresiaComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentMembresia
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentMembresia
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'progresosmaterialesmeitaciones', component:ProgresoMaterialMeditacionComponent,
        children:[
            {
                path: 'nuevo', component:InsertareditarComponentProgresoMaterialMeditacion
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentProgresoMaterialMeditacion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'progresosmusicasrelajaciones', component:ProgresoMusicaComponent,
         children:[
            {
                path: 'nuevo', component:InsertareditarComponentProgresoMusicaRelajacion
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentProgresoMusicaRelajacion
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'progresosvideos', component:ProgresoVideoComponent,
         children:[
            {
                path: 'nuevo', component:InsertareditarComponentProgresoVideo
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentProgresoVideo
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'tarjetas', component:TarjetaComponent,
         children:[
            {
                path: 'nuevo', component:InsertareditarComponentTarjeta
            },
            {
                path:'ediciones/:id', component:InsertareditarComponentTarjeta
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'menuCalmSphere', component:MenuPrincipalComponent,
    },
];
