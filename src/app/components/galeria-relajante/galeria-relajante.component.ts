import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-galeria-relajante',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: './galeria-relajante.component.html',
  styleUrls: ['./galeria-relajante.component.css'],
})
export class GaleriaRelajanteComponent implements OnInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayerRef!: ElementRef<HTMLAudioElement>;

  imagenes: any[] = [];
  apiKey = 'tM2HuY-1jspmN-44flize_2hT6W_pruAsA8TY-aF45I';
  estadoEmocional = '';
  indiceActual = 0;

  musicaUrl: string = '';
  velocidad = 1;
  volumen = 0.1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarPorEstado('relax');
  }

  buscarPorEstado(query: string = this.estadoEmocional || 'relax') {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=8&client_id=${this.apiKey}`;
    this.http.get<any>(url).subscribe((res) => {
      this.imagenes = res.results;
      this.indiceActual = 0;
    });
    this.buscarMusica(query);
  }

  buscarMusica(estado: string) {
    const token = 'lZz3dviBuvriS9ijQe6nwZ34IA1nZ7WX9SBD6Vac';
    const query = (estado.trim() || 'relaxing').toLowerCase();
    const url = `https://freesound.org/apiv2/search/text/?query=${query}&fields=previews,duration&filter=duration:[60 TO *]&sort=score&token=${token}`;

    this.http.get<any>(url).subscribe((res) => {
      if (res.results && res.results.length > 0) {
        this.musicaUrl = res.results[0].previews['preview-hq-mp3'];
        // El audio ya se vincula por binding en el HTML
      } else {
        this.musicaUrl = '';
        console.warn('No se encontró música de mínimo 1 minuto');
      }
    });
  }

  siguiente() {
    if (this.indiceActual < this.imagenes.length - 1) {
      this.indiceActual++;
    }
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }

  activarPantallaCompleta(index: number) {
    const img = document.getElementById(`img-${index}`);
    if (img?.requestFullscreen) {
      img.requestFullscreen();
    } else if ((img as any).webkitRequestFullscreen) {
      (img as any).webkitRequestFullscreen();
    } else if ((img as any).msRequestFullscreen) {
      (img as any).msRequestFullscreen();
    }
  }

  reproducirMusica() {
    const audio = this.audioPlayerRef?.nativeElement;
    if (audio) {
      audio.volume = this.volumen;
      audio.playbackRate = this.velocidad;
      audio.play().catch(err => console.warn('No se pudo reproducir:', err));
    }
  }

  pausarMusica() {
    const audio = this.audioPlayerRef?.nativeElement;
    if (audio) audio.pause();
  }

  actualizarVolumen(event: Event) {
    const valor = (event.target as HTMLInputElement).valueAsNumber;
    this.volumen = valor;
    const audio = this.audioPlayerRef?.nativeElement;
    if (audio) audio.volume = valor;
  }

  actualizarVelocidad(event: Event) {
    const valor = (event.target as HTMLInputElement).valueAsNumber;
    this.velocidad = valor;
    const audio = this.audioPlayerRef?.nativeElement;
    if (audio) audio.playbackRate = valor;
  }
}
