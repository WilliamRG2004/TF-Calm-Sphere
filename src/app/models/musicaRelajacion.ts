import { Terapia } from './terapia';
import { Playlist } from './playlist';
import { MusicaCategoria } from './musicaCategoria';

export class MusicaRelajacion {
  idMusica: number = 0;
  nombreMusica: string = '';
  linkMusica: string = '';
  descripcionMusica: string = '';
  terapia: Terapia = new Terapia();
  playlist: Playlist = new Playlist();
  musicaCategoria: MusicaCategoria=new MusicaCategoria();
}
